import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManagerWorkSiteListScreen from '../screens/ManagerScreens/ManagerWorkSiteListScreen'
import ManagerWorkSiteAddScreen from "../screens/ManagerScreens/ManagerWorkSiteAddScreen"
import ManagerWorkSiteEditScreen from "../screens/ManagerScreens/ManagerWorkSiteEditScreen"

const Stack = createStackNavigator()

export default function ManagerWorkSiteStack() {
    return (
      <Stack.Navigator
        screenOptions = {{
          headerShown: false
        }}>
        <Stack.Screen name="ManagerWorkSiteList" component={ManagerWorkSiteListScreen} />
        <Stack.Screen name="ManagerWorkSiteAdd" component={ManagerWorkSiteAddScreen} />
        <Stack.Screen name="ManagerWorkSiteEdit" component={ManagerWorkSiteEditScreen} />
      </Stack.Navigator>
    );
  }