import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "@/firebaseConfig";
import UserModel from "../models/UserModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createUser = async (user) => {
    //Only fields for email and password
    const newUser = { ...UserModel, email: user.email, password: user.password, name: user.name, google_sync: false };

    try {
        //Adds auth data with email and password
        const authUser = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password,
        );

        //Gets the 'Users' collection
        const usersCollection = collection(db, "Users");
        //Post the new user to the database
        const dataResult = await addDoc(usersCollection, newUser);

        await AsyncStorage.setItem("@user", dataResult.id);

        return "Success";
    }
    catch (err) {
        console.error(err.message);

        return err.message;
    }

}