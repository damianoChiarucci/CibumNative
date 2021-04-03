import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';
import { WebView } from 'react-native-webview';

const YoutubeScreen = () => {

  return (
    <View style={{flex:1, alignItems: "center"}}>
      <WebView
        style={{ marginTop: 20, width: Dimensions.get('screen').width, maxHeight: 230}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: "https://www.youtube.com/embed/-ZZPOXn6_9w"}}
      />
    </View>
  )

};

export default YoutubeScreen;