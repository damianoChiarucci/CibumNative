/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState, useEffect, createContext } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
  I18nManager
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import memoize from 'lodash.memoize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-community/async-storage';

import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { ROTTE } from './src/costanti';

import HomeScreen from './src/screens/Home';
import RicetteScreen from './src/screens/Ricette';
import DettaglioScreen from './src/screens/Dettaglio';
import LoginScreen from './src/screens/Login';
import TutorialScreen from './src/screens/Tutorial';

const gettersTraduzioni = {
  it: () => require("./src/traduzioni/it.json"),
  en: () => require("./src/traduzioni/en.json")
};

const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);

const setI18nConfiguration = (() => {
  const fallback = { languageTag: "en", isRTL: true};
  const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(gettersTraduzioni)) || fallback;
  
  translate.cache.clear();
  
  I18nManager.forceRTL(isRTL);


  i18n.translations = { [languageTag]: gettersTraduzioni[languageTag]()};
  i18n.locale = languageTag;
  console.log(i18n.locale, i18n.translations);
})();

const colorTabIcon = Platform.OS === "ios" ? "black" : "tomato";
const Tab = createBottomTabNavigator();

GoogleSignin.configure({
  webClientId: '321274120551-7jc3geu6e4on4rf6ac5v344r949bq12c.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  try {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (e) {
    if (e.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('SIGN_IN_CANCELLED');
    } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('PLAY_SERVICES_NOT_AVAILABLE');
    }
  }

};

function registraUtenteConEmail(email, pass, username) {
  auth()
  .createUserWithEmailAndPassword(email, pass)
  .then(({user}) => {
    console.log('User creato e loggato!');
    user.sendEmailVerification();
    user.updateProfile({
      displayName: username
    })
    .then(() => {
      const utenteReferenza = database().ref("/utenti/" + user.uid);
      utenteReferenza.set({
        email: email,
        name: username
      })
    })
    .catch((error) => { console.log(error)});
  })
  .catch((error) => {
    if (error.code === 'auth/email-already-in-use') {
      console.log("L'email è già stata utilizzata!")
    }
    console.error(error);
  });
};

function loggaUtenteConEmail(email, pass) {
  auth()
  .signInWithEmailAndPassword(email, pass)
  .catch((error) => {
    if (error.code === 'auth/wrong-password') {
      alert('Password Errata!');
    }
    console.error(error);
  })
};

function logout() {
  auth()
  .signOut()
  .then(() => console.log("L'utente si è sloggato!"));
};

function sendPasswordResetEmail(email) {
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      console.log("Reset pass email inviata");
    })
    .catch((error) => {
      console.log(error);
    });
};

export const RicetteContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [chiaviRicette, setChiaviRicette] = useState([]);
  const [oggettoRicette, setOggettoRicette] = useState({});
  const [showTutorial, setShowTutorial] = useState(true);

  const onAuthStateChanged = (userParam) => {
    if (userParam) {
      console.log('User Param Data: ', userParam);
      setUser({
        loggato: true,
        email: userParam.email,
        uid: userParam.uid,
        name: userParam.displayName,
        emailVerified: userParam.emailVerified,
      })
    } else {
      setUser({
        loggato: false
      });
    }
  };

  useEffect(() => {
    

    const ricetteRef = database().ref('/ricette');
    ricetteRef.on('value', (ricetteDbObj) => {
      const ricetteObj = ricetteDbObj.val();
      const ricetteArray = Object.keys(ricetteObj);
      console.log('RICETTE ARRAY: ', ricetteArray)
      setChiaviRicette(ricetteArray);
      setOggettoRicette(ricetteObj)
    });

    const retriveDataTutorial = async () => {
      try {
        const value = await AsyncStorage.getItem('TUTORIAL');
        if (value !== null) {
          setShowTutorial(false);
          console.log('TUTORIAL VALUE: ', value);
        }
        SplashScreen.hide();
      } catch (error) {
        console.error(error);
        SplashScreen.hide();
      }
    };
    retriveDataTutorial();
  
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const utenteReferenza = database().ref("/utenti/" + user.uid);
      utenteReferenza.once("value", (utenteSnapshot) => {
        const cloneObjUtente = utenteSnapshot.val();
        if(cloneObjUtente) {

        } else {
          utenteReferenza.set({
            email: user.email,
            name: user.name
          })
        }
      })
    }
  }, [user]);


  if (user && (!user.loggato || !user.emailVerified)) {
    return (
      <LoginScreen
        registraUtenteConEmail={registraUtenteConEmail}
        loggaUtenteConEmail={loggaUtenteConEmail}
        sendPasswordResetEmail={sendPasswordResetEmail}
        emailVerified={user.emailVerified}
        logout={logout}
        onGoogleButtonPress={onGoogleButtonPress}
      />
    )
  }

  if (showTutorial) {
    return (
      <TutorialScreen
        setShowTutorial={setShowTutorial}
      />
    )
  }

  return (
    <RicetteContext.Provider
      value={{
        oggettoRicette,
        chiaviRicette,
      }}
    >
      <SafeAreaView style={{flex: 1, backgroundColor: "coral"}}>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="coral"
        />
        <View>
          <Text>{translate("hello")}</Text>
        </View>
        <TouchableOpacity onPress={() => logout()}><Text>{translate("logout")}</Text></TouchableOpacity>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: colorTabIcon,
              inactiveTintColor: "black",
              showLabel: true,
              labelStyle: {
                fontSize: 10
              }
            }}
            screenOptions={({route}) => ({
              tabBarButton: (props) => {
                if (route.name === ROTTE.DETTAGLIO) {
                  return (null)
                } else {
                  return (<TouchableOpacity {...props}/>)
                }
              },
              tabBarIcon: ({focused, color, size}) => {
                let nomeIcona;

                if (route.name === ROTTE.HOME) {
                  nomeIcona = focused ? 'ios-home' : 'ios-home-outline'
                } else if (route.name === ROTTE.RICETTE) {
                  nomeIcona = focused ? 'ios-pizza' : 'ios-pizza-outline'
                }

                return (<Ionicons name={nomeIcona} color={color} size={size}/>)
              }
            })}
          >
            <Tab.Screen name={ROTTE.HOME} component={HomeScreen} />
            <Tab.Screen name={ROTTE.RICETTE} component={RicetteScreen} />
            {/* <Tab.Screen name={ROTTE.DETTAGLIO} component={DettaglioScreen} /> */}
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </RicetteContext.Provider>
  );
};


const styles = StyleSheet.create({
  
});

export default App;
