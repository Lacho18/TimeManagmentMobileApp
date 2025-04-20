import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            console.log("KUDE SA PARITEEEEEEEEEEEEEEEEE. AAAAAAAAAAAAAAAAAAAAAA");
            const storedUser = await AsyncStorage.getItem("@user");

            if (storedUser) {
                const userDocRef = doc(db, "Users", storedUser);
                const userSnapshot = await getDoc(userDocRef);

                if (userSnapshot.exists()) {
                    setUser({ id: userSnapshot.id, ...userSnapshot.data() });
                } else {
                    console.warn("No such user found in Firestore");
                }
            }

            setLoading(false);
        }

        loadUser();
    }, []);

    const logout = async () => {
        await AsyncStorage.removeItem("@user");
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
}