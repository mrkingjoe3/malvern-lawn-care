import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ManagerCustomerListScreen from "../screens/ManagerScreens/ManagerCustomerListScreen";
import ManagerCustomerEditScreen from "../screens/ManagerScreens/ManagerCustomerEditScreen";
import CustomerProvider from "./../context/managerContext/CustomerProvider";

const Stack = createStackNavigator();

export default function ManagerCustomerStack() {
    return (
        <CustomerProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="ManagerCustomerList"
                    component={ManagerCustomerListScreen}
                />
                <Stack.Screen
                    name="ManagerCustomerEdit"
                    component={ManagerCustomerEditScreen}
                />
            </Stack.Navigator>
        </CustomerProvider>
    );
}
