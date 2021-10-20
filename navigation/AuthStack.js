import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import LoadingScreen from '../screens/LoadingScreen'
import ForgotPassword from '../screens/ForgotPasswordScreen';
const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <>
            <Stack.Screen 
                name = "Loading"
                component = {LoadingScreen}
            />
            <Stack.Screen 
                name = "SignIn"
                component = {SignInScreen}
            />
            <Stack.Screen 
                name = "SignUp"
                component = {SignUpScreen}
            />
            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
            />
        </>
    );
};