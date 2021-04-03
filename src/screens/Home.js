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

import { RicetteContext, UserContext } from '../../App';
import { ROTTE, ROTTE_RICETTE } from '../costanti';
import MiniaturaRicetta from '../components/MiniaturaRicetta';

const HomeScreen = ({ navigation }) => {

  const {chiaviRicette, oggettoRicette} = useContext(RicetteContext);
  const {user, isPreferito, togglePreferito} = useContext(UserContext);
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
          isPreferito={isPreferito}
          togglePreferito={togglePreferito}
          goToDetails={() => navigation.navigate(ROTTE.RICETTE, 
            {
              screen: ROTTE_RICETTE.DETTAGLIO,
              params: {
                chiave: item
              }
            }
          )}
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