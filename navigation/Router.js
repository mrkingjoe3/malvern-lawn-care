import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from './AuthStack';
import ManagerAppStack from "./ManagerAppStack";
import EmployeeAppStack from "./EmployeeAppStack";
import { useAuth } from "../context/AuthProvider";

const Stack = createStackNavigator();

export default function Router() {

  const { state } = useAuth();

  return (

    <NavigationContainer>
        <Stack.Navigator
            screenOptions = {{
            headerShown: false
            }}
        >
            {!state.loggedIn ?
            AuthStack() :
            (state.isManager ?
                ManagerAppStack() :
                EmployeeAppStack())}
        </Stack.Navigator>
    </NavigationContainer>
  );
}