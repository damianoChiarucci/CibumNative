import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { RicetteContext } from '../../App';

const HomeScreen = ({ navigation }) => {

  const {chiaviRicette, oggettoRicette} = useContext(RicetteContext);
  return (
    <View style={{ flex: 1 }}>
      {chiaviRicette && chiaviRicette.map((chiave) => (
        <View key={chiave}>
          <Text>{oggettoRicette[chiave] && oggettoRicette[chiave].name}</Text>
        </View>
      ))}
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