import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, theme } from "../../constants"
import MainContainer from '../../components/MainContainer'

// This is the manager's home screen
// The defualt tab, this screen allows the manager to:
//
function ManagerHomeScreen() {

    return (
        <MainContainer kids={
            <Text>HOME SCREEN</Text>
        }/>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.30,
		shadowRadius: 4.65,
		elevation: 8,
    }
});

export default ManagerHomeScreen;