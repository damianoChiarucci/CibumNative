import React, { useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import {Card, Button} from 'react-native-elements';

const MiniaturaRicetta = ({titolo, descrizione, imgUrl, chiave, goToDetails, isPreferito, togglePreferito}) => {

  if(!titolo) {
    return null;
  }
  return (
    <Card>
      <TouchableOpacity onPress={goToDetails} pointerEvents={'box-none'}>
        <Card.Title>{titolo}</Card.Title>
        <Image
          resizeMode="cover"
          source={{uri: imgUrl}}
          style={styles.foto}
        />
        <Text>{descrizione}</Text>
        <View style={{ marginTop: 50}}>
          <Button
            type={isPreferito(chiave) ? 'solid' : 'outline'}
            onPress={() => togglePreferito(chiave)}
            title="Preferito"
          />
        </View>
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