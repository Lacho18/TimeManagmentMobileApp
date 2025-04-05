import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, limit, query, where } from "firebase/firestore/lite";
import UserModel from "../models/UserModel";

export default async function createUser(token) {
    try {
        // Create a Google credential with the access token
        const credentials = GoogleAuthProvider.credential(null, token);

        // Sign in with Firebase using the Google credential
        const userCredentials = await signInWithCredential(auth, credentials);

        // User is signed in
        console.log("User signed in with Firebase:", userCredential.user);

        //Separating the user data
        const userData = userCredentials.user;

        //Checks if the user has already created an account 
        const findUserQuery = query(collection(db, "Users"), where("email", "==", userData.email), limit(1));

        //Executes the query
        const querySnapshot = await getDocs(findUserQuery);

        if (querySnapshot.empty) {
            const insertResult = { ...UserModel, email: userData.email, google_sync: true };
        }
    }
    catch (err) {
        console.error(err);
    }
}