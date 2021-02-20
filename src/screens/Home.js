import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

const HomeScreen = ({ navigation }) => {
    console.log(navigation)
    return (
        <View style={{flex: 1}}>
            <View style={styles.wrapper}>
                <Ionicons name={"american-football-sharp"} size={56} color={"red"}/>
                <Text style={styles.labelOrange}>Home</Text>
            </View>
            <View style={{flex: 2}}>
                <Text style={styles.labelRed}>Home</Text>
                <Text style={styles.labelOrange}>Home</Text>
            </View>
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
        padding: 20,
    },
    labelOrange: {
        backgroundColor: 'orange',
    }
});

  export default HomeScreen;