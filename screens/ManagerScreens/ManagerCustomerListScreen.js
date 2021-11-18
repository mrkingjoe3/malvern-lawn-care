import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomListView from "../../components/CustomListView";
import MainContainer from "../../components/MainContainer";
import MainButton from "./../../components/MainButton";
import { useCustomerContext } from "../../context/managerContext/CustomerProvider";

export default function ManagerCustomerListScreen({ navigation }) {
    const { getCustomerList, updateCustomerState, clearCustomerState } =
        useCustomerContext();

    const [customerListData, setCustomerListData] = useState([]);

    // Open an existing work customer
    function onPressView(data) {
        updateCustomerState(data);
        navigation.navigate("ManagerCustomerEdit", { isAddCustomer: false });
    }

    // Create a new work customer
    function onPressAdd() {
        clearCustomerState();
        navigation.navigate("ManagerCustomerEdit", { isAddCustomer: true });
    }

    useEffect(() => {
        setCustomerListData(getCustomerList());
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
                            data={customerListData}
                            onPress={onPressView}
                            header={"Select a Customer"}
                            type={"person"}
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
