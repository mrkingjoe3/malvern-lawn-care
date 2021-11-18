import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
    createBottomTabNavigator,
    BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { dummyData, COLORS, SIZES, FONTS, theme } from "../constants";
import {
    MaterialIcons,
    Ionicons,
    MaterialCommunityIcons,
    Entypo,
} from "@expo/vector-icons";
import ManagerHomeScreen from "../screens/ManagerScreens/ManagerHomeScreen";
import ManagerWorkSiteStack from "./ManagerWorkSiteStack";
import ManagerEmployeeStack from "./ManagerEmployeeStack";
import ManagerSettingsScreen from "./../screens/ManagerScreens/ManagerSettingsScreen";
import ManagerCustomerStack from "./ManagerCustomerStack";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
            onPress={onPress}
        >
            <LinearGradient
                colors={[COLORS.primary, COLORS.white]}
                style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                }}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
};

// The tabs that are displayed on the managers home page
const ManagerTabs = ({ navigation }) => {
    // The tab layout
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 30,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: COLORS.white,
                    borderTopColor: "transparent",
                    height: 70,
                    borderRadius: 15,
                    ...styles.shadow2,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={ManagerHomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 15,
                            }}
                        >
                            <Entypo
                                name="home"
                                size={focused ? 40 : 32}
                                color={theme.COLORS.primary}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.black,
                                    ...FONTS.body5,
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="ManagerWorkSites"
                component={ManagerWorkSiteStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 15,
                            }}
                        >
                            <MaterialCommunityIcons
                                name="shovel"
                                size={focused ? 40 : 32}
                                color={theme.COLORS.primary}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.black,
                                    ...FONTS.body5,
                                }}
                            >
                                Sites
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="ManagerEmployee"
                component={ManagerEmployeeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 15,
                            }}
                        >
                            <Ionicons
                                name="person"
                                size={focused ? 40 : 32}
                                color={theme.COLORS.primary}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.black,
                                    ...FONTS.body5,
                                }}
                            >
                                Employees
                            </Text>
                        </View>
                    ),
                }}
            />
            {/*<Tab.Screen
				name = "ManagerEmployee"
				component = {ManagerEmployeeStack}
				options = {{
					tabBarIcon: ({ focused }) => (
						<Ionicons 
                            name="person" 
                            size={32} 
                            color={theme.COLORS.primary} />
					),
					tabBarButton: (props) => (
						<TabBarCustomButton
							{...props}
						/>
					)
				}}
            />*/}
            <Tab.Screen
                name="ManagerCustomer"
                component={ManagerCustomerStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 15,
                            }}
                        >
                            <MaterialIcons
                                name="attach-money"
                                size={focused ? 40 : 32}
                                color={theme.COLORS.primary}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.black,
                                    ...FONTS.body5,
                                }}
                            >
                                Customers
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={ManagerSettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                top: 15,
                            }}
                        >
                            <Ionicons
                                name="settings"
                                size={focused ? 40 : 32}
                                color={theme.COLORS.primary}
                            />
                            <Text
                                style={{
                                    color: focused
                                        ? COLORS.primary
                                        : COLORS.black,
                                    ...FONTS.body5,
                                }}
                            >
                                Settings
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow1: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    shadow2: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
    },
});

export default ManagerTabs;
