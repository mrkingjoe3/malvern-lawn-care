import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen'
const Stack = createStackNavigator();

export default function ManagerAppStack() {
    return (
        <>
            <Stack.Screen 
                name = "Home"
                component={HomeScreen}
                />
        </>
    );
};