/*
    THE PANIC BUTTON
    1. Detects the tasks with low or middle priority
    2. Changes their priority with 1 up
    3. Sets the tasks status to delayed
    4. Move the tasks to the next day starting time from the begin of the day
    5. The delayed tasks are filtered by their start time before the changes
    6. The already existing tasks are moved forward of time
*/

import { collection, getDocs, query, Timestamp, where, updateDoc, doc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { MAX_NUMBER_OF_DELAYED_TASK } from "../constants/MaxNumberDelayedTasks";
import { deleteTask } from "../database/taskController";
import { MAX_PRIORITY_LEVEL } from "../constants/TaskPriority";

export const panicButtonHandler = async (userId) => {
    const today = new Date();

    const tasks = await getTasksWithLowAndMediumPriority(today, userId, userStartTimeOfTheDay);

    //Updates every necessary field for the delayed task
    tasks = tasks.map(task => {
        const oldTaskValue = { ...task };
        task.priority = oldTaskValue.priority + 1 > MAX_PRIORITY_LEVEL ? MAX_PRIORITY_LEVEL : oldTaskValue.priority + 1;
        task.delayed.isDelayed = true;
        task.delayed.delayedTimes = oldTaskValue.delayed.delayedTimes + 1;

        return { ...task, priority: oldTaskValue.priority + 1, }
    });

    //Finds if there are tasks thats are delayed more than the given limit 
    const tasksForDelete = tasks.filter(task => task.delayed.delayedTimes > MAX_NUMBER_OF_DELAYED_TASK);

    //If there are remove them from the array of tasks
    if (tasksForDelete.length > 0) {
        tasks = tasks.filter(task => task.delayed.delayedTimes <= MAX_NUMBER_OF_DELAYED_TASK);

        //Removes every tasks which is delayed more than the system limit
        tasksForDelete.forEach(async (task) => await deleteTask(task));
    }

    console.log("Panic button was pressed");
    console.log(tasks);
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

//Gets the start time of the day as date object
//The start time is stored on the database on format "hours:minutes"
function getDateFromStartTime(userStartTimeOfTheDay) {
    const splitTime = userStartTimeOfTheDay.split(":");
    const startHour = Number(splitTime[0]);
    const startMinutes = Number(splitTime[1]);

    const tomorrowStartTime = new Date();
    tomorrowStartTime.setDate(tomorrowStartTime.getDate() + 1);
    tomorrowStartTime.setHours(startHour);
    tomorrowStartTime.setMinutes(startMinutes);

    return tomorrowStartTime;
}

async function addDelayedFieldToAllTasks() {
    const tasksCollection = collection(db, "Tasks");

    try {
        const snapshot = await getDocs(tasksCollection);

        const updates = snapshot.docs.map(async (document) => {
            console.log("E tyka");
            console.log(document);
            const docRef = doc(db, "Tasks", document.id);
            await updateDoc(docRef, {
                delayed: {
                    isDelayed: false,
                    delayedTimes: 0,
                },
            });
        });

        await Promise.all(updates);
        console.log("All tasks updated with delayed field.");
    } catch (error) {
        console.error("Error updating tasks:", error);
    }
}