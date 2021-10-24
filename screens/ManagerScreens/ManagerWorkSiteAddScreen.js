import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import { COLORS, SIZES, FONTS, theme } from "../../constants"
import { Ionicons } from '@expo/vector-icons'
import { ScrollView } from 'react-native';
import MainContainer from '../../components/MainContainer'
import MainButton from '../../components/MainButton'
import FormInput from '../../components/FormInput'
import FormPicker from '../../components/FormPicker'

export default function ManagerWorkSiteAddScreen({ navigation }) {
    
    const [address, setAddress] = useState('')
    const [customer, setCustomer] = useState('')
    const [customerList, setCustomerList] = useState([
        {label: 'Joe', value: 'Joe'},
        { label: 'John', value: 'John' },
        {label: 'Ethan', value: 'Ethan'}
    ]);
    const [employees, setEmployees] = useState([])
    const [employeeList, setEmployeeList] = useState([
        {label: 'Joe', value: 'Joe'},
        { label: 'John', value: 'John' },
        {label: 'Ethan', value: 'Ethan'}
    ]);
    const [description, setDescription] = useState('')

    function onPress() {
        navigation.navigate("ManagerWorkSiteList")
    }

    return (
        <MainContainer kids={
            <>
                <View style={{
                    flex: .945
                }}>
                    <FormInput
                        labelValue={address}
                        onChangeText={(address) => setAddress(address)}
                        placeholderText="Address"
                        icon="home"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <FormPicker
                        onValueChange={(customer) => {
                            console.log(customer)
                            setCustomer(customer)
                        }}
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
                            console.log(employees)
                            setEmployees(employees)
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
                            flex: 1
                        }}
                        labelValue={description}
                        onChangeText={(description) => setDescription(description)}
                        placeholderText="Description..."
                        icon="tags"
                        autoCapitalize="none"
                        autoCorrect={false}
                        multiline={true}
                    />
                </View>
                
                <MainButton style={{}} onPress={onPress} type={"submit"} /> 
            </>
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