import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import EmployeeHomeScreen from '../screens/EmployeeHomeScreen';
const Stack = createStackNavigator();

export default function EmployeeAppStack() {
    return (
        <>
            <Stack.Screen 
                name = "EmployeeHome"
                component={EmployeeHomeScreen}
            />
        </>
    );
};