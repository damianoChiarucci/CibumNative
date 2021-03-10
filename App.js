/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import { ROTTE } from './src/costanti';

import HomeScreen from './src/screens/Home';
import RicetteScreen from './src/screens/Ricette';
import LoginScreen from './src/screens/Login';

const colorTabIcon = Platform.OS === "ios" ? "black" : "tomato";
const Tab = createBottomTabNavigator();

function registraUtenteConEmail(email, pass, username) {
  auth()
  .createUserWithEmailAndPassword(email, pass)
  .then(({user}) => {
    console.log('User creato e loggato!');
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

const App = () => {
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (userParam) => {
    if (userParam) {
      console.log('User Param Data: ', userParam);
      setUser({
        loggato: true,
        email: userParam.email,
        uid: userParam.uid,
        name: userParam.displayName
      })
    } else {
      setUser({
        loggato: false
      });
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  
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


  if (user && !user.loggato) {
    return (
      <LoginScreen
        registraUtenteConEmail={registraUtenteConEmail}
        loggaUtenteConEmail={loggaUtenteConEmail}
        sendPasswordResetEmail={sendPasswordResetEmail}
      />
    )
  }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: "coral"}}>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="coral"
        />
        <TouchableOpacity onPress={() => logout()}><Text>Logout</Text></TouchableOpacity>
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
            <Tab.Screen name={ROTTE.DETTAGLIO} component={RicetteScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  
});

export default App;
