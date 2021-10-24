import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, theme } from "../constants"
import { Ionicons, Entypo } from '@expo/vector-icons';

// This is the managers home screen
// This will contain: 

export default function MainButton({onPress, type, style}) {

    return (
        <TouchableOpacity
            style={[styles.myEfficiencButtonContainer, styles.shadow, style]}
            onPress={() => onPress()}>
                
            {type === "signout" ?
                (<Ionicons
                    name="person-circle-outline"
                    size={40}
                    color={theme.COLORS.primary} />) : null}
            {type === "addsite" ?
                (<Entypo
                    name="add-to-list"
                    size={40}
                    color={theme.COLORS.primary} />) : null}
            {type === "submit" ?
                (<Ionicons
                    name="add"
                    size={40}
                    color={theme.COLORS.primary} />) : null}

            <View>
                <Text
                    style={{
                        paddingLeft: SIZES.radius,
                        ...FONTS.h2
                    }}
                >
                    {type === "signout" ? "Sign Out" : null}
                    {type === "addsite" ? "Add New Site" : null}
                    {type === "submit" ? "Submit" : null}
                </Text>
            </View>
        </TouchableOpacity>
    )
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