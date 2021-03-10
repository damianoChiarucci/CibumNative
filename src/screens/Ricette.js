import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';

const lista = [];
for (let i=0; i < 10000; i++) {
  lista[i] = {
    nome: `Elemento ${i}`,
    id: i.toString(),
  }
};

const RicetteScreen = () => {
    // const [lista, setLista] = useState([]);
    const __renderLista = ({item, index}) => (
      <Text style={styles.elemento}>{item.nome}</Text>
    );
    return (
      <View>
        {/* <ScrollView>
          {lista.map((elem, id) => (
            <View key={id}>
              <Text style={styles.elemento}>{elem.nome}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          data={lista}
          renderItem={__renderLista}
          keyExtractor={(elementoLista) => elementoLista.id}
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
  }
});

export default RicetteScreen;