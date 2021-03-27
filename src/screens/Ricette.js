import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { ROTTE_RICETTE } from '../costanti';
import DettaglioScreen from './Dettaglio';
import MiniaturaRicetta from '../components/MiniaturaRicetta';
import { RicetteContext } from '../../App';

const Stack = createStackNavigator();

const RicetteStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator style={styles.container}>
      <Stack.Screen name={ROTTE_RICETTE.RICETTE} component={RicetteScreen} />
      <Stack.Screen name={ROTTE_RICETTE.DETTAGLIO} component={DettaglioScreen} />
    </Stack.Navigator>
  )
};

const RicetteScreen = ({navigation}) => {
  const {chiaviRicette, oggettoRicette} = useContext(RicetteContext);
  const __renderLista = ({item, index}) => {

    if (!oggettoRicette[item]) {
      return null;
    }
    return (
      <View>
        <MiniaturaRicetta
          titolo={oggettoRicette[item].name}
          descrizione={oggettoRicette[item].description}
          imgUrl={oggettoRicette[item].image.url}
          chiave={item}
          goToDetails={() => navigation.navigate(ROTTE_RICETTE.DETTAGLIO, {chiave: item})}
        />
      </View>
    )
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={chiaviRicette}
        renderItem={__renderLista}
        keyExtractor={(elementoLista) => elementoLista}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  elemento: {
    textAlign: 'center',
    backgroundColor: 'blue',
    paddingVertical: 10,
    marginVertical: 5,
    color: 'white',
    fontSize: 13
  },
  container: {
    flex: 1,
  }
});

export default RicetteStackScreen;