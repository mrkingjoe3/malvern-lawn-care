import React, { useReducer, useMemo, useState } from "react";
import firebase from "firebase";
import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGE_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID,
    DATABASE_URL,
} from "@env";
import { useFonts } from "expo-font";
import AuthProvider from "./context/AuthProvider";
import Router from "./navigation/Router";

// TODO: Move this to its own file? and find a way to import api key
/*const firebaseConfig = {
    apiKey: "AIzaSyC5QvZZGunBK_Sc12wngRuzSGUG_lCD1fs",
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
    databaseURL: "https://malvern-lawn-care-default-rtdb.firebaseio.com",
    //databaseUrl: DATABASE_URL,
};*/

const firebaseConfig = {
    apiKey: "AIzaSyC5QvZZGunBK_Sc12wngRuzSGUG_lCD1fs",
    authDomain: "malvern-lawn-care.firebaseapp.com",
    databaseURL: "https://malvern-lawn-care-default-rtdb.firebaseio.com",
    projectId: "malvern-lawn-care",
    storageBucket: "malvern-lawn-care.appspot.com",
    messagingSenderId: "167034912056",
    appId: "1:167034912056:web:c90ecffbfda45390fa15cd",
    measurementId: "G-V8TYZG6B4G",
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
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
        // Wrap the entire app in an authetication context provider
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}
