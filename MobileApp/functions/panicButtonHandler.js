/*
    THE PANIC BUTTON
    1. Detects the tasks with low or middle priority
    2. Changes their priority with 1 up
    3. Sets the tasks status to delayed
    4. Move the tasks to the next day starting time from the begin of the day
    5. The delayed tasks are filtered by their start time before the changes
    6. The already existing tasks are moved forward of time
*/

import { collection, getDocs, query, Timestamp, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

export const panicButtonHandler = async (userId) => {
    const today = new Date();

    const tasks = await getTasksWithLowAndMediumPriority(today, userId);

    console.log("Panic button was pressed");
}

//Function that finds and returns the tasks with low and medium priority for the current day
async function getTasksWithLowAndMediumPriority(currentDay, userId) {
    const tasksCollection = collection(db, "Tasks");

    //Getting the beginning of the day that the new task will be
    const beginOfDay = new Date(currentDay);
    beginOfDay.setHours(0, 0, 0, 0);

    //Gets the end of the day that the new task will be
    const endOfDay = new Date(currentDay);
    endOfDay.setHours(23, 59, 59, 999);

    //Sets the date to firestore timestamps
    const beginTimeStamp = Timestamp.fromDate(beginOfDay);
    const endTimeStamp = Timestamp.fromDate(endOfDay);

    const q = query(tasksCollection,
        where("startTime", ">=", beginTimeStamp),
        where("startTime", "<=", endTimeStamp),
        where("userId", "==", userId),
        where("priority", "in", [1, 2]));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return [];
    }
    else {
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return tasks;
    }
}