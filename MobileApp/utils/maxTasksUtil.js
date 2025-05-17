import { collection, getDocs, query, Timestamp, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

export const checkForMaxTasksOverflow = async (newTaskDate, userMaxNumberOfTasks) => {
    const beginOfDay = new Date(newTaskDate);
    beginOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(newTaskDate);
    endOfDay.setHours(23, 59, 59, 999);

    const beginTimeStamp = Timestamp.fromDate(beginOfDay);
    const endTimeStamp = Timestamp.fromDate(endOfDay);

    const q = query(collection(db, "Tasks"), where("startTime", ">=", beginTimeStamp), where("startTime", "<=", endTimeStamp));

    const snapshot = await getDocs(q);

    if (snapshot.size > userMaxNumberOfTasks) {
        return true;
    }
    else {
        return false;
    }
}