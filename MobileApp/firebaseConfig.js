// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth /*getReactNativePersistence*/ } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const auth = initializeAuth(app);
export const db = getFirestore(app);


/*
    EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyCpl9e-Q7BM6xNRFAEnaUQWmy6VACwFO_g
EXPO_PUBLIC_AUTH_DOMAIN=timemanagmentproject-455119.firebaseapp.com
EXPO_PUBLIC_PROJECT_ID=timemanagmentproject-455119
EXPO_PUBLIC_STORAGE_BUCKET=timemanagmentproject-455119.firebasestorage.app
EXPO_PUBLIC_MESSAGING_SENDER_ID=610725811176
EXPO_PUBLIC_APP_ID=1:610725811176:web:924a58996c4e0d90508a5d
EXPO_PUBLIC_MEASUREMENT_ID=G-PL6DET19RR

EXPO_PUBLIC_GOOGLE_CLIENT_ID=610725811176-8oi2qt8jjjp0c3dma34d667a7upb3a3s.apps.googleusercontent.com
EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID=610725811176-f77kjj1d8q3cn2tcqm4akfkq1dn1kuad.apps.googleusercontent.com

*/