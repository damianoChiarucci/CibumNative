import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import {Card} from 'react-native-elements';

const MiniaturaRicetta = ({titolo, descrizione, imgUrl, chiave, goToDetails}) => {

  if(!titolo) {
    return null;
  }
  return (
    <Card>
      <TouchableOpacity onPress={goToDetails}>
        <Card.Title>{titolo}</Card.Title>
        <Image
          resizeMode="cover"
          source={{uri: imgUrl}}
          style={styles.foto}
        />
        <Text>{descrizione}</Text>
      </TouchableOpacity>
    </Card>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral'
  },
  foto: {
    flex: 1,
    height: 200,
  }

});

export default MiniaturaRicetta;