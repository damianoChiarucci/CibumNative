/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Ricette" component={RicetteScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
};

const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
    </View>
  )
};
const RicetteScreen = () => {
  return (
    <View>
      <Text>Ricette</Text>
      <Text>Ricette</Text>
      <Text>Ricette</Text>
      <Text>Ricette</Text>
      <Text>Ricette</Text>
      <Text>Ricette</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  
});

export default App;
