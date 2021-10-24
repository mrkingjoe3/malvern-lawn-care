import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, theme, dummyData } from "../../constants"
import CustomListView from '../../components/CustomListView';
import MainContainer from '../../components/MainContainer'
import MainButton from './../../components/MainButton';

export default function ManagerWorkSiteListScreen({ navigation }) {
    
    const [siteListData, setSiteListData] = useState(dummyData.siteListData)

    function onPressView(data) {
        navigation.navigate('ManagerWorkSiteEdit', {data})
    }

    function onPressAdd() {
        navigation.navigate('ManagerWorkSiteAdd')
    }

    return (
        <MainContainer kids={
            <View style={{flex: 1}}>
                <View style={{
                    flex: .85,
                }}>
                    <CustomListView
                        data={siteListData}
                        onPress={onPressView}
                        header={"Select a Job Site"}
                        type={"site"} />
                </View>
                <View style={{
                    flex: .15,
                    marginTop: 40
                }}>
                    <MainButton onPress={onPressAdd} type={"addsite"} />
                </View>
            </View>
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