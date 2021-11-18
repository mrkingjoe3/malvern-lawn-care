import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ManagerWorkSiteListScreen from "../screens/ManagerScreens/ManagerWorkSiteListScreen";
import ManagerWorkSiteEditScreen from "../screens/ManagerScreens/ManagerWorkSiteEditScreen";
import WorkSiteProvider from "../context/managerContext/WorkSiteProvider";

const Stack = createStackNavigator();

export default function ManagerWorkSiteStack() {
    return (
        <WorkSiteProvider>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="ManagerWorkSiteList"
                    component={ManagerWorkSiteListScreen}
                />
                <Stack.Screen
                    name="ManagerWorkSiteEdit"
                    component={ManagerWorkSiteEditScreen}
                />
            </Stack.Navigator>
        </WorkSiteProvider>
    );
}
