import React, { useMemo, useContext } from "react";
import firebase from "firebase";
import { useState } from "react";
import { dummyData } from "../../constants";

const CustomerContext = React.createContext();

function CustomerProvider({ children }) {
    const [id, setId] = useState();
    const [address, setAddress] = useState("");
    const [customer, setCustomer] = useState("");
    const [phone, setPhone] = useState();

    // Return a list of all the Customers
    const getCustomerList = () => {
        //TODO: poll firebase for actuall list of Customers
        return dummyData.customerData;
    };

    // Called when a Customer is opened, populates the context with relevant Customer data
    const updateCustomerState = (data) => {
        setId(data.id);
        setAddress(data.address);
        setCustomer(data.name);
        setPhone(data.phone);
    };

    // Returns information about the Customer state
    const getCustomerState = () => {
        return {
            id,
            address,
            customer,
            phone,
        };
    };

    // This submits the new or updated Customer to the database
    const submitCustomerToDb = () => {
        // TODO: submit the updated or new Customer to firebase
    };

    // Clears the current Customer and populates the context with defaults
    const clearCustomerState = () => {
        setId();
        setAddress("");
        setCustomer("");
        setPhone("");
    };

    const deleteCustomerFromDb = () => {};

    const value = useMemo(() => {
        return {
            getCustomerList,
            updateCustomerState,
            clearCustomerState,
            getCustomerState,
            submitCustomerToDb,
            deleteCustomerFromDb,
        };
    }, [id, address, customer, phone]);

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    );
}

const useCustomerContext = () => useContext(CustomerContext);
export { CustomerContext, useCustomerContext };
export default CustomerProvider;
