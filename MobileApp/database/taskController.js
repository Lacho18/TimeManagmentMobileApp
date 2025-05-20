import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateMonthName, millisecondsCalculator } from "../utils/dateUtil";
import { durationColorSetter } from "../utils/durationColorUtil";
import { featureTasksCompiler, taskInterval } from "../utils/tasksInterval";
import { checkForMaxTasksOverflow } from "../utils/maxTasksUtil";
import { MAX_NUMBER_OF_DELAYED_TASK } from "../constants/MaxNumberDelayedTasks";
import { getDateFromStartTime, getEveryTaskForTomorrow } from "../functions/panicButtonHandler";
import { createLog } from "./logsController";

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
    if (!user) return;

    // 1. Get the task from Firestore
    const docRef = doc(db, "Tasks", taskId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.error("Task not found");
        return;
    }

    // 2. Extract and convert timestamps
    const data = docSnap.data();
    const task = {
        id: docSnap.id,
        ...data,
        startTime: data.startTime?.toDate(),
        endTime: data.endTime?.toDate() || null,
    };

    // 3. Calculate task duration + rest time
    let taskDuration = Number(user.preferences.min_rest_time_between_tasks);
    if (task.startTime && task.endTime) {
        const originalDuration = task.endTime.getTime() - task.startTime.getTime();
        taskDuration = originalDuration + Number(user.preferences.min_rest_time_between_tasks);
    }

    // 4. Compute new start time (next day at user-preferred start)
    const userStartTime = getDateFromStartTime(user.preferences.dayStartTime);

    // 5. Set new task times
    task.startTime = userStartTime;
    task.endTime = new Date(userStartTime.getTime() + taskDuration);

    const allUpdatedTasks = await getEveryTaskForTomorrow(taskDuration, userStartTime, Number(user.preferences.min_rest_time_between_tasks));

    allUpdatedTasks.unshift(task);

    allUpdatedTasks.forEach(task => {
        const docRef = doc(db, "Tasks", task.id);

        updateDoc(docRef, task);
    });
};

export const deleteTask = async (taskObject, userId) => {

    try {
        const docRef = doc(db, "Tasks", taskObject.id);

        //Create proper notifications and logs
        if (taskObject.completed) {
            await createLog(`Completed task: ${taskObject.title}}`, userId);
        }
        else if (taskObject.delayed.delayedTimes > MAX_NUMBER_OF_DELAYED_TASK) {
            //In this case the task is removed because too many days has been delayed
            await createLog(`Task ${taskObject.title} was automatically deleted due to too many delays`, userId);
        }

        await deleteDoc(docRef);
    }
    catch (err) {
        console.error(err.message);

    }
}

export const deleteEveryTask = async () => {
    const querySnapshot = await getDocs(collection(db, "Tasks"));

    querySnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "Tasks", docSnap.id))
    );
}