import React, { useState } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

const LoginScreen = ({registraUtenteConEmail, loggaUtenteConEmail, sendPasswordResetEmail, emailVerified, logout, onGoogleButtonPress}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const registrazioneAbilitata = () => {

    return (email.length === 0 || pass.length === 0 || username.length === 0);
  };

  if (emailVerified === false) {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Text>Verifica la tua email con il link che ti abbiamo inviato ed esegui nuovamente la login</Text>
          <TouchableOpacity onPress={() => logout()}><Text>Logout</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text>Benvenuto, accedi con la tua email:</Text>
        <TextInput
          value={username}
          style={styles.input}
          numberOfLines={1}
          onChangeText={(text) => setUsername(text)}
          placeholder={'Username'}
          placeholderTextColor='#666'
        />
        <TextInput
          value={email}
          style={styles.input}
          numberOfLines={1}
          onChangeText={(text) => setEmail(text)}
          placeholder={'Email'}
          placeholderTextColor='#666'
          textContentType={'emailAddress'}
        />
        <TextInput
          secureTextEntry={true}
          value={pass}
          onChangeText={(text) => setPass(text)}
          numberOfLines={1}
          placeholder={'Password'}
          placeholderTextColor='#666'
          style={styles.input}
        />
        <View style={styles.loginBtnContainer}>
          <Button
            title="Accedi"
            type="outline"
            disabled={(email.length === 0 || pass.length === 0)}
            onPress={() => {loggaUtenteConEmail(email, pass)}}
          />
          <Button
            title="Registrati"
            type="solid"
            disabled={registrazioneAbilitata()}
            onPress={() => {registraUtenteConEmail(email, pass, username)}}
          />
        </View>
        <TouchableOpacity onPress={() => sendPasswordResetEmail(email)}>
          <Text style={styles.resetPassword}>Password Dimenticata?</Text>
        </TouchableOpacity>
        <GoogleSigninButton
          // style={{ width: 192, height:48 }}
          size={GoogleSigninButton.Size.Icon}
          // color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      </View>
    </View>
  )
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: Dimensions.get('screen').width / 1.5,
    height: Dimensions.get('screen').height / 15,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  loginBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resetPassword: {
    marginTop: 20,
    fontSize: 11,
    color: 'coral',
  }

};

export default LoginScreen;