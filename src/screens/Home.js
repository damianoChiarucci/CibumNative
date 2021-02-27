import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native-elements';
import { SvgCssUri }  from 'react-native-svg';
import Homer from '../assets/homer.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import homerImg from '../assets/homer-simpson.jpg';

const HomeScreen = ({ navigation }) => {
    console.log(navigation);
    return (
        <View style={{flex: 1}}>
            <Homer width={400} height={500} />
            <Image PlaceholderContent={<ActivityIndicator/>} style={{height: 100, width: 300, resizeMode: "cover"}} source={{uri: "https://images.unsplash.com/photo-1543373014-cfe4f4bc1cdf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=3604&q=80"}}/>
            <SvgCssUri
                width="100%"
                height="100%"
                uri="http://thenewcode.com/assets/svg/accessibility.svg"
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