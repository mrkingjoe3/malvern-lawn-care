import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManagerTabs from './ManagerTabs';
const Stack = createStackNavigator();

export default function ManagerAppStack() {
    return (
        <>
            <Stack.Screen 
                name = "ManagerTabs"
                component={ManagerTabs}
                />
        </>
    );
};