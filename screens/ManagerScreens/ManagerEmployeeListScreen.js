import React, {useState} from 'react';
import { View, StyleSheet } from "react-native";
import { dummyData, COLORS, SIZES, FONTS, theme } from "../../constants"
import CustomListView from '../../components/CustomListView'
import MainContainer from '../../components/MainContainer'

export default function ManagerEmployeeListScreen({ navigation }) {

    const [employeeListData, setEmployeeListData] = useState(dummyData.employeeListData);

    function onPress(item) {
        navigation.navigate('ManagerEmployeeInformation', {item})
    }

    return (
        <MainContainer kids={
            <View style={{
                flex: .945
            }}>
                <CustomListView
                    data={employeeListData}
                    onPress={onPress}
                    header={"Select an Employee"}
                    type={"employee"} />
                </View>
        }/>
    );
}

const styles = StyleSheet.create({
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