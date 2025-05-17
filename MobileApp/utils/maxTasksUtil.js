import { collection, getDocs, query, Timestamp, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

//CVhecks if the new task will go over the border of the tasks for the day
export const checkForMaxTasksOverflow = async (newTaskDate, userMaxNumberOfTasks) => {
    //Getting the beginning of the day that the new task will be
    const beginOfDay = new Date(newTaskDate);
    beginOfDay.setHours(0, 0, 0, 0);

    //Gets the end of the day that the new task will be
    const endOfDay = new Date(newTaskDate);
    endOfDay.setHours(23, 59, 59, 999);

    //Sets the date to firestore timestamps
    const beginTimeStamp = Timestamp.fromDate(beginOfDay);
    const endTimeStamp = Timestamp.fromDate(endOfDay);

    //Getting every tasks for the current date
    const q = query(collection(db, "Tasks"), where("startTime", ">=", beginTimeStamp), where("startTime", "<=", endTimeStamp));

    const snapshot = await getDocs(q);

    //Checks if there are more tasks for the given date than the number of the tasks that user gives
    if (snapshot.size > userMaxNumberOfTasks) {
        return true;
    }
    else {
        return false;
    }
}