import React, {useContext, useState} from 'react';
import { SafeAreaView, FlatList,Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, theme } from "../constants"
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import { AuthContext } from '../AuthContext';
import EmployeeListView from './../components/EmployeeListView';

const SignOutButton = ({ signOut }) => {

    return (
        <TouchableOpacity
            style={[styles.myEfficiencButtonContainer, styles.shadow]}
            onPress = {() => {
                firebase.auth().signOut()
                    .then(() => {
                        signOut()
                    })
                    .catch((error) => {
                        console.error('Sign Out Error', error)
                    });
                }}>
        
            <Ionicons 
                name="person-circle-outline" 
                size={40} 
                color={theme.COLORS.primary} />

            <View>
                <Text
                    style={{
                        paddingLeft: SIZES.radius,
                        ...FONTS.h2
                    }}
                >Sign Out</Text>
            </View>

        </TouchableOpacity>
    )
}

function HomeScreen({ navigation }) {
    
    const { signOut } = useContext(AuthContext);
    const [employeeListData, setEmployeeListData] = useState(dummyData.employeeListData);

    return (

        <SafeAreaView style={styles.container}>

            <View style = {[styles.listContainer, styles.shadow]}>
                <EmployeeListView employees={employeeListData} navigation={navigation} />
            </View>

            <SignOutButton signOut={signOut}/>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
		marginTop: SIZES.padding,
		//height: '85%',
		marginHorizontal: SIZES.padding,
		padding: 20,
		borderRadius: SIZES.radius,
		backgroundColor: COLORS.white,
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

export default HomeScreen;