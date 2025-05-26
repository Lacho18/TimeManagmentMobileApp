// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth /*, getReactNativePersistence*/,
  browserLocalPersistence,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

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
export const auth = initializeAuth(
  app,
  {
    persistence: browserLocalPersistence,
  }
  /*{
  //persistence: getReactNativePersistence(AsyncStorage),
}*/
);
export const db = getFirestore(app);
