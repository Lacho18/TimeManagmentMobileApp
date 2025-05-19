import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { millisecondsCalculator } from "../utils/dateUtil";
import { durationColorSetter } from "../utils/durationColorUtil";
import { featureTasksCompiler, taskInterval } from "../utils/tasksInterval";
import { checkForMaxTasksOverflow } from "../utils/maxTasksUtil";
import { MAX_NUMBER_OF_DELAYED_TASK } from "../constants/MaxNumberDelayedTasks";
import { getDateFromStartTime, getEveryTaskForTomorrow } from "../functions/panicButtonHandler";

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

export const createTask = async (newTask, user) => {

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

        console.log("The new task before ", newTask);

        //Add min rest time between tasks if necessary
        //Adjusts the time of the inserted task by the closest on the past
        newTask = await taskInterval(newTask, user.preferences.min_rest_time_between_tasks);
        //Adjust every feature task until there are no more on there are not more changes needed
        await featureTasksCompiler(newTask, user.preferences.min_rest_time_between_tasks);

        //Adjusts whether the user goes over his limit of tasks
        const isMaxTasksOverflowed = await checkForMaxTasksOverflow(newTask.startTime, user.preferences.maxNumberOfTasks);
        if (isMaxTasksOverflowed) {
            return "The big numbers of tasks can be stressful. Uploading this will go over your limit of daily tasks.";
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

export const delayTask = async (taskId, user) => {
    console.log("Niggassssssss");
    console.log(taskId);
    //Getting the task
    const docRef = doc(db, "Tasks", taskId);
    const docSnap = await getDoc(docRef);

    const task = { id: docSnap.id, ...docSnap.data() };
    if (task.endTime) {
        task.endTime = task.endTime.toDate();
    }

    /*
        TESTVAY GO TOVA
    */

    const taskDuration = task.endTime ? task.endTime.getTime() + user.preferences.min_rest_time_between_tasks : user.preferences.min_rest_time_between_tasks;

    const userStartTime = getDateFromStartTime(user.preferences.dayStartTime);

    await getEveryTaskForTomorrow(taskDuration, userStartTime, user.preferences.min_rest_time_between_tasks);

    task.startTime = userStartTime;
    if (task.endTime) {
        task.endTime = new Date(userStartTime.getTime() + taskDuration);
    }

    await updateDoc(docRef, task);
}

export const deleteTask = async (taskObject) => {

    try {
        const docRef = doc(db, "Tasks", taskObject.id);

        //Create proper notifications and logs
        if (taskObject.completed) {
            //Create notification and log for completed task
        }
        else if (taskObject.delayed.delayedTimes > MAX_NUMBER_OF_DELAYED_TASK) {
            //In this case the task is removed because too many days has been delayed
        }


        await deleteDoc(docRef);
    }
    catch (err) {
        console.error(err.message);

    }
}