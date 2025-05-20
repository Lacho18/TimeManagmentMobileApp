import { collection, getDocs, query, where } from "firebase/firestore/lite"
import { db } from "../firebaseConfig"

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