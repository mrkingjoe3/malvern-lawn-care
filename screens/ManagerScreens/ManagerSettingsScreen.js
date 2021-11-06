import React, { useContext, useState } from 'react';
import { ScrollView, FlatList,Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, theme } from "../../constants"
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import { useAuth } from "../../context/AuthProvider";
import MainContainer from '../../components/MainContainer'
import MainButton from './../../components/MainButton';

function ManagerSettingsScreen() {

    const { state, signOut } = useAuth();

    React.useEffect(() => console.log(state))

    function onPress(){
        firebase.auth().signOut()
            .then(() => {
                signOut()
            })
            .catch((error) => {
                console.error('Sign Out Error', error)
            });
        }

    return (
        <MainContainer kids={
            <MainButton onPress={onPress} type={"signout"} />
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
    myEfficiencButtonContainer: {
        flex: .08,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.padding,
        marginHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
    },
});
 
export default ManagerSettingsScreen;