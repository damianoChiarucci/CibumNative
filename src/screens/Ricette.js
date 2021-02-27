import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const lista = [];
for (let i=0; i < 100; i++) {
  lista[i] = {
    nome: `Elemento ${i}`,
    id: i
  }
};

const RicetteScreen = () => {
    return (
      <View>
        <ScrollView>
          {lista.map((elem, id) => (
            <View key={id}>
              <Text style={styles.elemento}>{elem.nome}</Text>
            </View>
          ))}
        </ScrollView>
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