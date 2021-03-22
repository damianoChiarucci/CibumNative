import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import { RicetteContext } from '../../App';
import MiniaturaRicetta from '../components/MiniaturaRicetta';

const HomeScreen = ({ navigation }) => {

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
  wrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  labelRed: {
    backgroundColor: 'red',
    color: 'red',
    fontFamily: 'Roboto-Bold',
    width: Dimensions.get('screen').width * 0.4
  },
  labelOrange: {
    backgroundColor: 'orange',
  }
});

export default HomeScreen;