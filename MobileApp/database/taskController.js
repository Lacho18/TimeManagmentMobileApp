import { addDoc, collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { millisecondsCalculator } from "../utils/dateUtil";
import { durationColorSetter } from "../utils/durationColorUtil";

export const getTaskForGivenDay = async (givenDay) => {
    const startOfDay = new Date(givenDay.getFullYear(), givenDay.getMonth(), givenDay.getDate(), 0, 0, 0);
    const endOfDay = new Date(givenDay.getFullYear(), givenDay.getMonth(), givenDay.getDate(), 23, 59, 59);

    const taskCollection = collection(db, "Tasks");

    const q = query(taskCollection, where("startTime", ">=", startOfDay), where("startTime", "<=", endOfDay));

    try {
        const querySnapshot = await getDocs(q);

        const tasks = [];

        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });

        return tasks;
    }
    catch (err) {
        console.error("Error getting tasks for the day:", err);
        return [];
    }
}

export const createTask = async (newTask) => {

    console.log(newTask);

    if (newTask.title === "") {
        return "Please provide a title for the task";
    }

    if (newTask.startTime === null) {
        return "Please select start time of the task!";
    }

    try {
        const userId = await AsyncStorage.getItem("@user");

        if (!userId) {
            throw new Error("No user account fount!");
        }

        //Sets the userId of the task to it's creator
        newTask.userId = userId;

        //Calculates the duration of the task
        if (newTask.endTime) {
            //Calculates the duration in milliseconds
            const taskDuration = newTask.endTime - newTask.startTime;

            //Gets text value for the duration
            newTask.duration = millisecondsCalculator(taskDuration);

            //Gets proper color to describe the duration of the task
            newTask.durationColor = durationColorSetter(newTask.duration);
        }



        const taskCollection = collection(db, "Tasks");

        const insertedDoc = await addDoc(taskCollection, newTask);

        return "Success";
    }
    catch (err) {
        console.error(err.message);

        return err.message;
    }
}