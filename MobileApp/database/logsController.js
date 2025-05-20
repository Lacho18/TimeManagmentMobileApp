import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore/lite"
import { db } from "../firebaseConfig"
import LogModel from "../models/LogModel";

export const getLogs = async (userId) => {
    const col = collection(db, "Logs");

    const q = query(col, where("userId", "==", userId));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return [];
    }

    const result = snapshot.map(doc => {
        return { id: doc.id, ...doc.data() };
    })

    return result;
}

export const createLog = async (logMessage, userId) => {
    const col = collection(db, "Logs");

    const logStructure = { ...LogModel };
    logStructure.userId = userId;
    logStructure.createdAt = new Date();
    logStructure.message = logMessage;

    await addDoc(col, logStructure);
}

export const deleteLog = async (logId) => {
    const docRef = doc(db, "Logs", logId);

    await deleteDoc(docRef)
}