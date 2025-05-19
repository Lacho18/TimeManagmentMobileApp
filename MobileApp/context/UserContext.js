import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //When load finds the data for the user from the Firestore using user id from the async storage
        const loadUser = async () => {
            const storedUser = await AsyncStorage.getItem("@user");

            if (storedUser) {
                //Gets reference for the document
                const userDocRef = doc(db, "Users", storedUser);
                //Gets the document for the user
                const userSnapshot = await getDoc(userDocRef);

                //If the user is found sets global state to his data
                if (userSnapshot.exists()) {
                    setUser({ id: userSnapshot.id, ...userSnapshot.data() });
                } else {
                    console.warn("No such user found in Firestore");
                }
            }

            //After user is found the loading is set to false to allow the components to render
            setLoading(false);
        }

        loadUser();
    }, []);

    function changeUserPreferences(field, value) {
        setUser(oldValue => {
            const newValue = { ...oldValue };
            const preferences = { ...newValue.preferences };
            preferences[field] = value;

            newValue.preferences = preferences;

            return newValue;
        });
    }

    //Function that log outs the user from its account
    const logout = async () => {
        await AsyncStorage.removeItem("@user");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, logout, loading, changeUserPreferences }}>
            {children}
        </UserContext.Provider>
    );
}