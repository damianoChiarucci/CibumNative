import React, {useContext} from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { RicetteContext } from '../../App';


const DettaglioScreen = ({route}) => {
  const { chiave } = route.params;
  const { oggettoRicette } = useContext(RicetteContext);
  console.log(oggettoRicette[chiave]);
  const ricetta = oggettoRicette[chiave];
  return (
    <View style={{flex:1}}>
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <Image
          resizeMode="cover"
          source={{uri: ricetta.image.url}}
          style={styles.foto}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> {ricetta.name}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>  {ricetta.description}</Text>
        </View>

        <View style={styles.stepsContainer}>
          <View style={styles.stepsTitle}><Text>Procedimento</Text></View>
          {ricetta && ricetta.recipeInstructions && ricetta.recipeInstructions.map((step, index) => (
            <View key={index} style={{padding: 10}}>
              <Text>{step?.text}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#eee',
  },
  titleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'coral',
  },
  title: {
    fontSize: 18,
    color: 'white',
  },
  foto: {
    flex: 1,
    height: 300,
  },
  stepsTitle: {
    padding:10
  }
});

export default DettaglioScreen;