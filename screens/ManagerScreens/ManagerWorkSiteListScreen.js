import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import CustomListView from "../../components/CustomListView";
import MainContainer from "../../components/MainContainer";
import MainButton from "./../../components/MainButton";
import { useWorkSiteContext } from "../../context/managerContext/WorkSiteProvider";

export default function ManagerWorkSiteListScreen({ navigation }) {
    const { getWorkSiteList, updateWorkSiteState, clearWorkSiteState } =
        useWorkSiteContext();

    const [siteListData, setSiteListData] = useState([]);

    // Open an existing work site
    function onPressView(data) {
        updateWorkSiteState(data);
        navigation.navigate("ManagerWorkSiteEdit", { isAddWorkSite: false });
    }

    // Create a new work site
    function onPressAdd() {
        clearWorkSiteState();
        navigation.navigate("ManagerWorkSiteEdit", { isAddWorkSite: true });
    }

    useEffect(() => {
        setSiteListData(getWorkSiteList());
    });

    return (
        <MainContainer
            kids={
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flex: 0.85,
                        }}
                    >
                        <CustomListView
                            data={siteListData}
                            onPress={onPressView}
                            header={"Select a Job Site"}
                            type={"site"}
                        />
                    </View>
                    <View
                        style={{
                            flex: 0.15,
                            marginTop: 40,
                        }}
                    >
                        <MainButton onPress={onPressAdd} type={"add"} />
                    </View>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});
