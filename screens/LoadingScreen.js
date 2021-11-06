import React, {useCallback, useContext} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from "../context/AuthProvider";

// This is the first screen when the app opens
// This screen will check if the user is signed in
// And redirect accordingly
const LoadingScreen = ({ navigation }) => {
    
    // The global sign in function
    const { state, signIn } = useAuth();
    
    useFocusEffect(

        useCallback(() => {

            console.log("State: " + state.userToken)
    
            // When the user signs in, the auth state changes
            // Get the user token, and call the signIn method
            // Check app.js to see what this method does
            const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            
                if (user) {
                    user.getIdToken().then((token) => signIn({token, user}));
                }
                else {
                    navigation.navigate('SignIn')
                }
            });

            // Unsubscribing from the listener when the component is unmounting.
            return () => unsubscribe(); 
        })
      );

    // Displaying a loading icon until firebase is loaded and the user is checked
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LoadingScreen;