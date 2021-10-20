import React, {useState, useContext, useCallback} from "react";
import {View, Text, Image, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import 'firebase/firestore';
import 'firebase/firestore';
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { useFocusEffect } from '@react-navigation/native';
import {
  FACEBOOK_APP_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID
} from '@env'
import { FONTS } from "../constants";

const SignUpScreen = ({ navigation }) => {

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false) // Do I need a loading thing until the scren loads?

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
    console.log(errorMessage)
  }

  /*function renderLoading() {
    if (loading) {
      return (
        <View>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }*/

  async function signInWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          onLoginFailure(errorMessage)
      });
    /*Segment.identify(email);
    Segment.trackWithProperties("User SignIn", {
      accountType: "CustomEmailAuth",
      email:email
    });*/
  }

  async function signInWithFacebook() {

    try {
      await Facebook.initializeAsync({
        appId: '617062219468868',
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
        await firebase.auth()
          .signInWithCredential(credential)
          .catch((error) => onLoginFailure(error));

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

      <Text style={styles.text}>Create an account</Text>

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

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        icon="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => signInWithEmail()}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <View>
        <SocialButton
          buttonTitle="Sign Up with Facebook"
          icon="logo-facebook"
          color="#4867aa"
          backgroundColor="#e6eaf4"
          onPress={() => signInWithFacebook()}
        />
  
        <SocialButton
          buttonTitle="Sign Up with Google"
          icon="logo-google"
          color="#de4d41"
          backgroundColor="#f5e7ea"
          onPress={() => signInWithGoogle()}
        />
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  
  /*return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={{ fontSize: 32, fontWeight: '700', color: 'gray' }}>
              App Name
            </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={displayName}
                onChangeText={displayName => setDisplayName(displayName)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={email => setEmail(email)}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={password}
                onChangeText={password => setPassword(password)}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'red',
                width: '80%'
              }}
            >
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={{ width: '86%', marginTop: 10 }}
              onPress={() => signInWithEmail()}
            >
                <Text>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: '86%', marginTop: 10 }}
              onPress={() => signInWithFacebook()}>
              <View style={styles.button}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: '#FFFFFF'
                  }}
                >
                  Continue with Facebook
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ width: '86%', marginTop: 10 }}
              onPress={() => signInWithGoogle()}>
              <View style={styles.googleButton}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: '#707070'
                  }}
                >
                  Continue with Google
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: '200', fontSize: 17, textAlign: 'center' }}
                onPress={() => {
                  navigation.navigate('SignIn');
                }}
              >
                Already have an account?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );*/
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
    resizeMode: 'cover',
  },
  text: {
    marginBottom: 10,
    color: '#051d5f',
    ...FONTS.h1
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    color: '#2e64e5',
    ...FONTS.h3
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
    justifyContent: 'center',
  },
  color_textPrivate: {
    ...FONTS.body4,
    color: 'grey',
  },
});

export default SignUpScreen;