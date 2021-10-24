import React, { useReducer, useMemo, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGE_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID
} from '@env'
import { AuthContext } from "./AuthContext";
import AuthStack from './navigation/AuthStack';
import ManagerAppStack from "./navigation/ManagerAppStack";
import EmployeeAppStack from "./navigation/EmployeeAppStack";
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

// Move this to its own file?
const firebaseConfig = {
    apiKey: "AIzaSyC5QvZZGunBK_Sc12wngRuzSGUG_lCD1fs",
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId:MEASUREMENT_ID
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

// A reducer function. Has previous state and performs something based on the action
// to generate a new state
const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        isManager: action.isManager
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
}

// Initial state of the reducer
const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  isManager: false
}

export default function App({ navigation }) {

  // Dispatch is a function that takes an action object as an input
  // Ex.: dispatch({ type: 'RESTORE_TOKEN', token: userToken });
  // It forwards this action to the reducer function, which returns an updated state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Sets the given role of the given user 
  function setUserRole(uid, userRole) {
    firebase.database().ref('users/' + uid).set({ userRole })
      .then((data) => {
        //console.log('data ', data)
      })
      .catch((error) => {
        //console.log('error ', error)
      })
  }

  // Signs the given user in and changes available screens
  async function signIn({token, user}) {

    await AsyncStorage.setItem('token', JSON.stringify(token));

    if (user) {

      const uid = user.uid;
      const email = user.email;

      //TODO we can only referenc the database after writing ot it first why????
      if (email === "j.campbell505@gmail.com") {
        setUserRole(uid, "manager");
      }
      else {
        setUserRole(uid, "regular");
      }

      // Check the user's role
      firebase.database().ref('users/' + uid).once('value', (snapshot) => {
          
        console.log(snapshot.val())

        // If users role is initalized
        if (snapshot.val() && snapshot.val().userRole) {

          if (snapshot.val().userRole === "manager") {
            dispatch({ type: 'SIGN_IN', token: 'token', isManager: true});
          }
          else {
            dispatch({ type: 'SIGN_IN', token: 'token', isManager: false});
          }
        }

        // If user's role is not initalized
        else {

          if (email === "j.campbell505@gmail.com") {
              setUserRole(uid, "manager");
              dispatch({ type: 'SIGN_IN', token: 'token', isManager: true});
          }
          else {
              setUserRole(uid, "regular");
              dispatch({ type: 'SIGN_IN', token: 'token', isManager: false});
          }
        }
      })
    }
  }
  
  async function signOut() {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'SIGN_OUT' });
  }
    
  async function signUp(data) {
    const isManager = isUserManager();
    await AsyncStorage.setItem('token', JSON.stringify(data));
    dispatch({ type: 'SIGN_IN', token: 'data', isManager: isManager });
  }

  // Wait for the fonts to be loaded before procedding
  const [loaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    // AuthContext wraps our entie app in this conext, allowing us to access
    // the authContext anywhere. Used for sign in and sign out methods
    <AuthContext.Provider value={{ signIn, signOut, signUp }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions = {{
            headerShown: false
          }}
        >
          {state.userToken == null ? 
            AuthStack() :
            (state.isManager ?
                ManagerAppStack() :
                EmployeeAppStack())}
          </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
