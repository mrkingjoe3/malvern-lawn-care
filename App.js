import React, { useReducer, useMemo, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firebase from 'firebase';
import { getDatabase, ref, onValue, set } from "firebase/database";
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
        console.log('data ', data)
      })
      .catch((error) => {
        console.log('error ', error)
      })
  }

  // This is the authorization context for the app
  // Using context, these functions/ variables are visible to any component
  const authContext = useMemo(() => ({

    signIn: async ({token, user}) => {

      await AsyncStorage.setItem('token', JSON.stringify(token));

      const db = getDatabase();
      const reference = ref(db, "users/" + uid);

      onValue(reference, (snapshot) => {

        // If users role is initalized
        if (snapshot.val() && snapshot.val().userRole) {

          const userRole = snapshot.val().userRole;

          if (userRole === "manager") {
            console.log('already manager')
            dispatch({ type: 'SIGN_IN', token: 'token', isManager: true});
          }
          else {
            console.log('not already manager')
            dispatch({ type: 'SIGN_IN', token: 'token', isManager: false});
          }
        }

        // If user's role is not initalized
        else {

          if (email === "j.campbell505@gmail.com") {
            setUserRole(uid, "manager");
            console.log('manager')
            dispatch({ type: 'SIGN_IN', token: 'token', isManager: true});
          }

          else {
            setUserRole(uid, "regular");
            console.log('not manager')
            dispatch({ type: 'SIGN_IN', token: 'token', isManager: false});
          }
        }
      });

      /*if (user) {

          const uid = user.uid;
          const email = user.email;

          setUserRole(uid, 'manager')

          // Check the user's role
          firebase.database().ref('users/' + uid).once('value', (snapshot) => {

            // If users role is initalized
            if (snapshot.val() && snapshot.val().userRole) {

              const userRole = snapshot.val().userRole;

              if (userRole === "manager") {
                console.log('already manager')
                dispatch({ type: 'SIGN_IN', token: 'token', isManager: true});
              }
              else {
                  console.log('not manager')
                  return false;
              }
            }

            // If user's role is not initalized
            else {

              if (email === "j.campbell505@gmail.com") {
                  //console.log('manager')
                  setUserRole(uid, "manager");
                  return true;
              }
              else {
                  console.log('not manager')
                  setUserRole(uid, "regular");
                  return false;
              }
            }
        })
      }

      else{
        // We should never reach here, because this code
        // is executed once a user sign ins
        // We could add some error thingy here though to be safe
      }*/
    },
    
    signOut: async () => {
      await AsyncStorage.removeItem('token');
      dispatch({ type: 'SIGN_OUT' });
    },
      
    signUp: async (data) => {
      const isManager = isUserManager();
      await AsyncStorage.setItem('token', JSON.stringify(data));
      dispatch({ type: 'SIGN_IN', token: 'data', isManager: isManager });
    },
  }), []);

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
    <AuthContext.Provider value={authContext}>
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







/*
const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator   
        screenOptions = {{
          headerShown: false
        }}  
        initialRouteName = "Loading"
      >

        <Stack.Screen 
          name = "Loading"
          component = {LoadingScreen}
        />
        <Stack.Screen 
          name = "SignIn"
          component = {SignInScreen}
        />
        <Stack.Screen 
          name = "Home"
          component = {HomeScreen}
        />
        <Stack.Screen
          name = 'SignUp'
          component = {SignUpScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>

  )
};

export default App;*/