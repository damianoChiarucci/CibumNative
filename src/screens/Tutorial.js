import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-community/async-storage';

const TutorialScreen = ({setShowTutorial}) => {
  const slides = [1, 2, 3].map((key, id) => ({
    key: key,
    title: 'TITLE :'+key,
    text: 'text :'+key,
    image: 'https://www.izsvenezie.it/wp-content/uploads/2014/07/tutorial.jpg',
    backgroundColor: `#${30*id}2231`
  }));

  const onDone = () => {
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('TUTORIAL', 'true');
      } catch (error) {
        console.error(error);
      }
    };
    storeData();
    setShowTutorial(false);
  };

  const __renderItem = ({item}) => (
    <View style={styles.slide}>
      <Text style={styles.slideTitle} >{item.title}</Text>
      <Image style={styles.slideImage} source={{uri: item.image}}/>
      <Text style={styles.slideText}>{item.text}</Text>
    </View>
  );

  return (
    <AppIntroSlider
      style={styles.container}
      renderItem={__renderItem}
      data={slides}
      onDone={onDone}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral'
  },
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  slideImage: {
    width: 150,
    height: 70,
    margin: 15,
  },
  slideTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  slideText: {
    color: 'white',
    fontWeight: 'bold',
  }


});

export default TutorialScreen;