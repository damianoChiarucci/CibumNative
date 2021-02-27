/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SplashScreen from 'react-native-splash-screen';

import { ROTTE } from './src/costanti';

import HomeScreen from './src/screens/Home';
import RicetteScreen from './src/screens/Ricette';

const Tab = createBottomTabNavigator();
const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: "tomato",
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
