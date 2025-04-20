import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, getDocs, limit, query, where } from "firebase/firestore/lite";

export default async function logInWithEmailAndPassword(logInData) {
    try {
        //Authenticates the user by the given log in information
        const userCredentials = await signInWithEmailAndPassword(auth, logInData.email, logInData.password);

        //Gets the data for the user after success log in to the system
        const user = userCredentials.user;

        //Query for finding the user on the database
        const findUserQuery = query(
            collection(db, "Users"),
            where("email", "==", logInData.email),
            where("password", "==", logInData.password),
            limit(1)
        );

        //Executes the query
        const querySnapshot = await getDocs(findUserQuery);

        //Sets user id to the Async storage
        await AsyncStorage.setItem("@user", querySnapshot.docs[0].id);

        //Returns the user if everything succeed
        return user;
    }
    catch (err) {
        console.error(err.message);
        return null;
    }
}