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

function registraUtenteConEmail(email, pass) {
  auth()
  .createUserWithEmailAndPassword(email, pass)
  .then(() => {
    console.log('User creato e loggato!')
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

const App = () => {
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (userParam) => {
    if (userParam) {
      console.log('User Param Data: ', userParam);
      setUser({
        loggato: true,
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

  if (user && !user.loggato) {
    return (
      <LoginScreen
        registraUtenteConEmail={registraUtenteConEmail}
        loggaUtenteConEmail={loggaUtenteConEmail}
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
