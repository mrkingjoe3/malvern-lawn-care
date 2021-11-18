import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS, theme } from "../../constants";
import { AntDesign } from "@expo/vector-icons";
import { useWorkSiteContext } from "../../context/managerContext/WorkSiteProvider";
import MainContainer from "../../components/MainContainer";
import MainButton from "../../components/MainButton";
import FormInput from "../../components/FormInput";
import FormPicker from "../../components/FormPicker";

export default function ManagerWorkSiteEditScreen({ navigation, route }) {
    const {
        getWorkSiteState,
        getCustomerList,
        getEmployeeList,
        submitWorkSiteToDb,
        updateWorkSiteState,
        deleteWorkSiteFromDb,
    } = useWorkSiteContext();

    const [isAddWorkSite, setIsAddWorkSite] = useState(false);

    const [address, setAddress] = useState("");
    const [customer, setCustomer] = useState("Pete");
    const [customerList, setCustomerList] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeeList, setEmployeeList] = useState([]);
    const [description, setDescription] = useState("");

    function onSubmitWorkSite() {
        updateWorkSiteState({ address, customer, employees, description });
        submitWorkSiteToDb();
        navigation.navigate("ManagerWorkSiteList");
    }

    function deleteWorkSite() {
        deleteWorkSiteFromDb();
        navigation.navigate("ManagerWorkSiteList");
    }

    useEffect(() => {
        setCustomerList(getCustomerList());
        setEmployeeList(getEmployeeList());
        const data = getWorkSiteState();
        console.log(data.workers);
        setAddress(data.address);
        setCustomer(data.customer);
        setEmployees(data.employees);
        setDescription(data.description);
        setIsAddWorkSite(route.params.isAddWorkSite);
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
                            labelValue={address}
                            onChangeText={(address) => setAddress(address)}
                            placeholderText="Address"
                            icon="home"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <FormPicker
                            onValueChange={(customer) => setCustomer(customer)}
                            items={customerList}
                            value={customer}
                            setValue={setCustomer}
                            icon="user"
                            placeholder="Select a customer"
                            allowMultiple={false}
                            min={1}
                            max={1}
                        />
                        <FormPicker
                            onValueChange={(employees) => {
                                console.log(employees);
                                setEmployees(employees);
                            }}
                            items={employeeList}
                            value={employees}
                            setValue={setEmployees}
                            icon="team"
                            placeholder="Select workers"
                            allowMultiple={true}
                            min={1}
                            max={10}
                        />
                        <FormInput
                            style={{
                                flex: 1,
                            }}
                            labelValue={description}
                            onChangeText={(description) =>
                                setDescription(description)
                            }
                            placeholderText="Description..."
                            icon="tags"
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                        />
                    </View>

                    {!isAddWorkSite ? (
                        <TouchableOpacity
                            style={{ alignSelf: "center", marginTop: 20 }}
                            onPress={() => deleteWorkSite()}
                        >
                            <AntDesign name="delete" size={40} color="red" />
                        </TouchableOpacity>
                    ) : null}

                    <MainButton
                        style={{}}
                        onPress={onSubmitWorkSite}
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
