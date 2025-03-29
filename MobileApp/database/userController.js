import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore/lite";
import { db } from "@/firebaseConfig";

export const createUser = async (user) => {
    //Only fields for email and password
    const newUser = { ...user };

    //Default color theme
    newUser.theme = "purple";

    //True if logged in with google account
    newUser.googleSync = false;

    //Daily notification time (Default 08:00, can be changed after)
    newUser.dailyNotificationTime = "08:00";

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
        await addDoc(usersCollection, newUser);

        return "Success";
    }
    catch (err) {
        console.error(err.message);

        return err.message;
    }

}