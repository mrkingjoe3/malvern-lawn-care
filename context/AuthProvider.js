import React, { useMemo, useReducer, useContext } from "react";
import { reducer, initialState } from "./AuthReducer";
import firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Sets the given role of the given user
    function setUserRole(uid, userRole) {
        firebase
            .database()
            .ref("users/" + uid)
            .set({ userRole })
            .then((data) => {})
            .catch((error) => {});
    }

    // Signs the given user in and changes available screens
    async function signIn({ token, user }) {
        await AsyncStorage.setItem("token", JSON.stringify(token));

        if (user) {
            const uid = user.uid;
            const email = user.email;

            // Check the user's role
            firebase
                .database()
                .ref("users/" + uid)
                .once("value", (snapshot) => {
                    // If users role is initalized
                    if (snapshot.val() && snapshot.val().userRole) {
                        if (snapshot.val().userRole === "manager") {
                            dispatch({
                                type: "SIGN_IN",
                                token: token,
                                isManager: true,
                            });
                        } else {
                            dispatch({
                                type: "SIGN_IN",
                                token: token,
                                isManager: false,
                            });
                        }
                    }

                    // If user's role is not initalized
                    else {
                        if (email === "j.campbell505@gmail.com") {
                            setUserRole(uid, "manager");
                            dispatch({
                                type: "SIGN_IN",
                                token: token,
                                isManager: true,
                            });
                        } else {
                            setUserRole(uid, "regular");
                            dispatch({
                                type: "SIGN_IN",
                                token: token,
                                isManager: false,
                            });
                        }
                    }
                });
        }
    }

    async function signOut() {
        await AsyncStorage.removeItem("token");
        dispatch({ type: "SIGN_OUT" });
    }

    async function signUp(data) {
        const isManager = isUserManager();
        await AsyncStorage.setItem("token", JSON.stringify(data));
        dispatch({ type: "SIGN_IN", token: "data", isManager: isManager });
    }

    const value = useMemo(() => {
        return { state, signIn, signOut, signUp };
    }, [state]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);
export { AuthContext, useAuth };
export default AuthProvider;
