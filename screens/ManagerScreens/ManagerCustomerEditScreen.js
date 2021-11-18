import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useCustomerContext } from "../../context/managerContext/CustomerProvider";
import MainContainer from "../../components/MainContainer";
import MainButton from "../../components/MainButton";
import FormInput from "../../components/FormInput";

export default function ManagerCustomerEditScreen({ navigation, route }) {
    const {
        getCustomerState,
        submitCustomerToDb,
        updateCustomerState,
        deleteCustomerFromDb,
    } = useCustomerContext();

    const [isAddCustomer, setIsAddCustomer] = useState(false);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [customer, setCustomer] = useState("Pete");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState();

    function onSubmitCustomer() {
        if (phone.length == 10) {
            updateCustomerState({ address, customer, phone, id });
            submitCustomerToDb();
            navigation.navigate("ManagerCustomerList");
        } else {
            Alert.alert("Enter valid phone number");
        }
    }

    function deleteCustomer() {
        deleteCustomerFromDb();
        navigation.navigate("ManagerCustomerList");
    }

    useEffect(() => {
        const data = getCustomerState();
        setAddress(data.address);
        setCustomer(data.customer);
        setPhone(data.phone);
        setId(data.id);
        setIsAddCustomer(route.params.isAddCustomer);
    }, []);

    return (
        <MainContainer
            kids={
                <>
                    <View
                        style={{
                            flex: 0.945,
                        }}
                    >
                        <FormInput
                            labelValue={customer}
                            onChangeText={(customer) => setCustomer(customer)}
                            placeholderText="Customer"
                            icon="user"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FormInput
                            labelValue={address}
                            onChangeText={(address) => setAddress(address)}
                            placeholderText="Address"
                            icon="home"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FormInput
                            labelValue={city}
                            onChangeText={(city) => setCity(city)}
                            placeholderText="City"
                            icon="home"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FormInput
                            labelValue={state}
                            onChangeText={(state) => setState(state)}
                            placeholderText="State"
                            icon="home"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FormInput
                            labelValue={zip}
                            onChangeText={(zip) => setZip(zip)}
                            placeholderText="zip"
                            icon="home"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FormInput
                            labelValue={phone}
                            onChangeText={(phone) => setPhone(phone)}
                            placeholderText="Phone Number"
                            icon="phone"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="phone-pad"
                            maxLength={10}
                        />
                    </View>

                    {!isAddCustomer ? (
                        <TouchableOpacity
                            style={{ alignSelf: "center", marginTop: 20 }}
                            onPress={() => deleteCustomer()}
                        >
                            <AntDesign name="delete" size={40} color="red" />
                        </TouchableOpacity>
                    ) : null}

                    <MainButton
                        style={{}}
                        onPress={onSubmitCustomer}
                        type={"submit"}
                    />
                </>
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
