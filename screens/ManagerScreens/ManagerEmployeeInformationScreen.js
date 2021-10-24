import React from 'react';
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES, FONTS, theme } from "../../constants"
import MapView from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler'
import MainContainer from '../../components/MainContainer'

// This screen displays informationm about a specific employee
export default function ManagerEmployeeInformationScreen() {

    return (
        <MainContainer kids={
            <MapView style={styles.map} />
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
    },
    map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});