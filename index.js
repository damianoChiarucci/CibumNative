/**
 * @format
 */

import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessege => {
  console.log('Messaggio intercettato in Background: ', remoteMessege);
});

AppRegistry.registerComponent(appName, () => App);
