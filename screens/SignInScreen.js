import React, {useState, useCallback} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { useFocusEffect } from '@react-navigation/native';
import {
  FACEBOOK_APP_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID
} from '@env'
import { FONTS } from "../constants"
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

const SignInScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useFocusEffect(
    useCallback(() => {

      // When the user signs in, the auth state changes
      // Call the loading screen, which will handle the rest of the login process
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate('Loading')
        }
      });

      // unsubscribing from the listener when the component is unmounting.
      return () => unsubscribe();
    })
  );

  function onLoginFailure(errorMessage) {
    console.log(errorMessage);
    Alert.alert(
      "Sign In Error",
      errorMessage
    );
  }

  async function signInWithEmail() {
    if (email && password){
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            onLoginFailure(errorMessage)
        });
    }
    else {
      onLoginFailure("Enter a valid email and password");
    }
  }

  async function signInWithFacebook() {

    try {
      await Facebook.initializeAsync({
        appId: FACEBOOK_APP_ID,
      });

      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });

      if (type === 'success') {

        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        console.log(credential)
        //await firebase.auth().signInAndRetrieveDataWithCredential(credential);
        /*await firebase.auth()
          .signInWithCredential(credential)
          .catch((error) => onLoginFailure(error));*/

        // Get the user's name using Facebook's Graph API
        //const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      }
      else {
        onLoginFailure('Cancelled')
      }
    } catch (e) {
      onLoginFailure(e);
    }
  }

  async function signInWithGoogle() {

    try {
      // Opens a goolge login window
      const result = await Google.logInAsync({
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID
      });

      // If google log in worked, authenticate with firebase
      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          result.idToken,
          result.accessToken);

        firebase.auth()
          .signInWithCredential(credential)
          .catch((error) => onLoginFailure(error));
      }
      else {
        onLoginFailure('The google part did not work')
      }
    }
    catch (e) {
      onLoginFailure(e)
    }
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/logo.jpg')}
        style={styles.logo}
      />

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        icon="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        icon="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => signInWithEmail()}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View>
        <SocialButton
          buttonTitle="Sign In with Facebook"
          icon="logo-facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => signInWithFacebook()}
        />

        <SocialButton
          buttonTitle="Sign In with Google"
          icon="logo-google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => signInWithGoogle()}
        />
      </View>

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.navButtonText}>
          Don't have an acount?
        </Text>
      </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    paddingTop: 0,
    flexGrow: 1,
    backgroundColor: 'white'
  },
  logo: {
    height: 200,
    width: 200,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    color: '#2e64e5',
    ...FONTS.h4
  },
});

export default SignInScreen;