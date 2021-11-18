import React, { useMemo, useContext } from "react";
import firebase from "firebase";
import { useState } from "react";
import { dummyData } from "../../constants";

const WorkSiteContext = React.createContext();

function WorkSiteProvider({ children }) {
    const [id, setId] = useState();
    const [address, setAddress] = useState("");
    const [customer, setCustomer] = useState("");
    const [employees, setEmployees] = useState([]);
    const [description, setDescription] = useState("");

    // Return a list of all the work sites
    const getWorkSiteList = () => {
        //TODO: poll firebase for actuall list of work sites
        return dummyData.siteListData;
    };

    // Get a list of all the employees
    const getEmployeeList = () => {
        return [
            { label: "Joseph", value: "Joe" },
            { label: "John", value: "John" },
            { label: "Ethan", value: "Ethan" },
        ];
    };

    const getCustomerList = () => {
        return [
            { label: "Joseph", value: "Joe" },
            { label: "Johnathan", value: "John" },
            { label: "Seeley", value: "Ethan" },
        ];
    };

    // Called when a work site is opened, populates the context with relevant work site data
    const updateWorkSiteState = (data) => {
        setId(data.id);
        setAddress(data.address);
        setCustomer(data.customer);
        setEmployees(data.employees);
        setDescription(data.description);
    };

    // Returns information about the work site after a DB look up using the worksite ID
    const getWorkSiteState = () => {
        // Look up in DB by address and set all the values
        return {
            address,
            customer,
            employees,
            description,
        };
    };

    // This submits the new or updated work site to the database
    const submitWorkSiteToDb = () => {
        // TODO: submit the updated or new work site to firebase
    };

    // Clears the current work site and populates the context with defaults
    const clearWorkSiteState = () => {
        setId();
        setAddress("");
        setCustomer("");
        setEmployees([]);
        setDescription("");
    };

    const deleteWorkSiteFromDb = () => {};

    const value = useMemo(() => {
        return {
            getWorkSiteList,
            getEmployeeList,
            getCustomerList,
            updateWorkSiteState,
            clearWorkSiteState,
            getWorkSiteState,
            submitWorkSiteToDb,
            deleteWorkSiteFromDb,
        };
    }, [id, address, customer, employees, description]);

    return (
        <WorkSiteContext.Provider value={value}>
            {children}
        </WorkSiteContext.Provider>
    );
}

const useWorkSiteContext = () => useContext(WorkSiteContext);
export { WorkSiteContext, useWorkSiteContext };
export default WorkSiteProvider;
