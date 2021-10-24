import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { COLORS, SIZES, FONTS, theme } from "../../constants"
import MainContainer from '../../components/MainContainer'

export default function ManagerCustomerScreen() {

    return (
        <MainContainer kids={
            <Text>Empty SCREEN</Text>
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