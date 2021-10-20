import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView, Image, View, Text, Alert } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import firebase from 'firebase';
import { FONTS } from "../constants";

const ForgotPassword = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    
    const reset = async() => {
        setShowLoading(true);
        try {
            await firebase.auth().sendPasswordResetEmail(email);
            setShowLoading(false);
            navigation.navigate('SignIn')
        } catch (e) {
            setShowLoading(false);
            Alert.alert(
                e.message
            );
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

            <FormButton
                buttonTitle="Reset Password"
                onPress={() => reset()}
                />
                
            <FormButton
                buttonTitle="Back to sign in"
                onPress={() => navigation.navigate('SignIn')}
            />

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
 
export default ForgotPassword;