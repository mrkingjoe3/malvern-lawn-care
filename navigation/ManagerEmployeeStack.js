import ManagerEmployeeListScreen from "../screens/ManagerScreens/ManagerEmployeeListScreen";
import ManagerEmployeeInformationScreen from "../screens/ManagerScreens/ManagerEmployeeInformationScreen";
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';


const Stack = createStackNavigator()

export default function ManagerEmployeeStack() {
    return (
      <Stack.Navigator
      screenOptions = {{
        headerShown: false
      }}>
        <Stack.Screen name="ManagerEmployeeList" component={ManagerEmployeeListScreen} />
        <Stack.Screen name="ManagerEmployeeInformation" component={ManagerEmployeeInformationScreen} />
      </Stack.Navigator>
    );
  }