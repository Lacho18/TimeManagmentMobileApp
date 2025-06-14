import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, getDocs, limit, query, where } from "firebase/firestore/lite";
import UserModel from "../models/UserModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function createUserWithGoogle(token) {
    try {
        // Create a Google credential with the access token
        const credentials = GoogleAuthProvider.credential(null, token);

        // Sign in with Firebase using the Google credential
        const userCredentials = await signInWithCredential(auth, credentials);

        // User is signed in
        console.log("User signed in with Firebase:", userCredentials.user);

        //Separating the user data
        const userData = userCredentials.user;

        //Checks if the user has already created an account 
        const findUserQuery = query(collection(db, "Users"), where("email", "==", userData.email), limit(1));

        //Executes the query
        const querySnapshot = await getDocs(findUserQuery);

        //If user is new to the application
        if (querySnapshot.empty) {
            //Creates the new user by user model
            const insertResult = { ...UserModel, email: userData.email, name: userData.displayName, image: userData.photoURL, google_sync: true };

            //Finds the collection
            const usersCollection = collection(db, "Users");

            //Inserts the new document
            const dataResult = await addDoc(usersCollection, insertResult);

            await AsyncStorage.setItem("@user", dataResult.id);
        }
        else {
            await AsyncStorage.setItem("@user", querySnapshot.docs[0].id);
        }
    }
    catch (err) {
        console.error(err);
    }
}