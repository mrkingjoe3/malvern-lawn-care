import React, {useState} from 'react';
import { View, StyleSheet, Keyboard } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, theme } from "../constants"

export default function MainContainer({ kids }) {
    
    const shouldSetResponse = () => true;
    const onRelease = () => (
        Keyboard.dismiss()
    );

    return (
        <View
            onResponderRelease={ onRelease }
            onStartShouldSetResponder={ shouldSetResponse }
            style={[styles.container, styles.shadow]}>
            {kids}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: SIZES.marginTop,
        marginBottom: SIZES.marginBottom,
        marginHorizontal: SIZES.padding,
        padding: SIZES.padding,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.white
    },
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