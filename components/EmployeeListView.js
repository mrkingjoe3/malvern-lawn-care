import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Image
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS, theme } from "../constants"

// This custom view creates a list of a manager's emloyees. Clikcing on an employee
// will go to their EfficienC from the managers perspective

const EmployeeListView = ({ navigation, employees }) => {
	
	// One item of the list
	const renderItem = ({ item }) => (
		
		<TouchableOpacity
			style = {styles.button}
			onPress={() => {
				//navigation.navigate('Home', { userType: 'Manager' })
			}}>
			
			<Ionicons 
				name="person" 
				size={32} 
				color={theme.COLORS.primary} />

			<Text
				style={{
					flex: 1,
					marginLeft: SIZES.radius,
					...FONTS.h3
				}}
			>{item.name}</Text>

			<Entypo
				name="arrow-with-circle-right" 
				size={24} 
				color="black" />
			
		</TouchableOpacity>
	)

	return (
		<View style={{flex: 1}}>

			<Text style = {{...FONTS.h2}}>Select an employee</Text>

			<View style = {{height: 10}}></View>

			<FlatList
				scrollEnabled = {true}
				data = {employees}
				keyExtractor = {item => `${item.id}`}
				renderItem = {renderItem}
				showVerticalScrollIndicator = {false}
				ItemSeparatorComponent = {() => {
					return (
						<View
							style = {{
								width: "100%",
								height: 1,
								backgroundColor: COLORS.lightGray
							}}
						>
						</View>
					)
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: SIZES.base
	}
})

export default EmployeeListView;