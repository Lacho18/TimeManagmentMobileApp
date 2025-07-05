import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, or, and, writeBatch } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatDateMonthName, millisecondsCalculator, taskOnRestTime } from "../utils/dateUtil";
import { durationColorSetter } from "../utils/durationColorUtil";
import { featureTasksCompiler, taskInterval } from "../utils/tasksInterval";
import { checkForMaxTasksOverflow } from "../utils/maxTasksUtil";
import { MAX_NUMBER_OF_DELAYED_TASK } from "../constants/MaxNumberDelayedTasks";
import { getDateFromStartTime, getEveryTaskForTomorrow } from "../functions/panicButtonHandler";
import { createLog } from "./logsController";

export const getTaskForGivenDay = async (givenDay, userId) => {
    if (userId === null || userId === undefined) return [];

    const startOfDay = new Date(givenDay.getFullYear(), givenDay.getMonth(), givenDay.getDate(), 0, 0, 0);
    const endOfDay = new Date(givenDay.getFullYear(), givenDay.getMonth(), givenDay.getDate(), 23, 59, 59);

    const taskCollection = collection(db, "Tasks");

    const tasksQuery = query(
        taskCollection,
        where("startTime", ">=", startOfDay),
        where("startTime", "<=", endOfDay),
        where("completed", "==", false),
        where("repeating.isRepeating", "==", false),
        where("userId", "==", userId)
    );

    const repeatingTasks = query(
        taskCollection,
        where("repeating.isRepeating", "==", true),
        where("userId", "==", userId)
    );

    try {
        const tasksSnapshot = await getDocs(tasksQuery);
        const repeatingSnapshot = await getDocs(repeatingTasks);

        const tasks = [];
        const repeatingTasksArray = [];

        tasksSnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        repeatingSnapshot.forEach((doc) => {
            repeatingTasksArray.push({ id: doc.id, ...doc.data() });
        });

        const today = new Date().toDateString();
        const givenDayStr = givenDay.toDateString();

        const finalRepeatingTasks = repeatingTasksArray.filter(task => {
            if (givenDayStr === today) {
                return task.completed === false;
            } else {
                return true; // include even if completed
            }
        });

        return [...tasks, ...finalRepeatingTasks];
    }
    catch (err) {
        console.error("Error getting tasks for the day:", err);
        return [];
    }
}

export const createTask = async (newTask, user) => {
    let result = "Success";

    //Requires title
    if (newTask.title === "") {
        return "Please provide a title for the task";
    }

    //Requires start time of the task
    if (newTask.startTime === null) {
        return "Please select start time for the task!";
    }

    const now = new Date();

    //Requires the task to not be in the past
    if (newTask.startTime < now) {
        return "This time is already on the past. Can you provide a different start time";
    }

    //Requires the task to not be in the resting hours
    if (!taskOnRestTime(user.preferences.dayStartTime, newTask.startTime, newTask.endTime)) {
        return "Resting is the most important thing. This tasks goes in your resting hours";
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
            //Checks if the task end time is before the task start time
            if (newTask.endTime <= newTask.startTime) {
                return "The task can not end before it begins 😄. Did you make lapse on selection the end time."
            }
            //Calculates the duration in milliseconds
            const taskDuration = newTask.endTime - newTask.startTime;

            //Gets text value for the duration
            newTask.duration = millisecondsCalculator(taskDuration);

            //Gets proper color to describe the duration of the task
            newTask.durationColor = durationColorSetter(newTask.duration);
        }

        //If the task is marked as repeating set its start and end time on separate fields
        if (newTask.repeating.isRepeating) {
            const pad = (num) => String(num).padStart(2, '0');

            const repeatStartTime = `${pad(newTask.startTime.getHours())}:${pad(newTask.startTime.getMinutes())}`;
            newTask.repeating.repeatStartTime = repeatStartTime;

            if (newTask.endTime) {
                const repeatEndTime = `${pad(newTask.endTime.getHours())}:${pad(newTask.endTime.getMinutes())}`;
                newTask.repeating.repeatEndTime = repeatEndTime;
            }
        }

        //Adjusts whether the user goes over his limit of tasks
        const isMaxTasksOverflowed = await checkForMaxTasksOverflow(newTask.startTime, user.preferences.maxNumberOfTasks);
        if (isMaxTasksOverflowed) {
            result = "The big numbers of tasks can be stressful. Adding more tasks will make your day very hard.";
        }

        //Add min rest time between tasks if necessary
        //Adjusts the time of the inserted task by the closest on the past
        newTask = await taskInterval(newTask, user.preferences.min_rest_time_between_tasks);
        //Adjust every feature task until there are no more on there are not more changes needed
        await featureTasksCompiler(newTask, user.preferences.min_rest_time_between_tasks);

        const taskCollection = collection(db, "Tasks");

        const insertedDoc = await addDoc(taskCollection, newTask);

        return result;
    }
    catch (err) {
        console.error(err.message);

        return err.message;
    }
}

export const delayTask = async (taskId, user) => {
    if (!user) return;

    //Get the task from Firestore
    const docRef = doc(db, "Tasks", taskId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        console.error("Task not found");
        return;
    }

    //Extract and convert timestamps
    const data = docSnap.data();
    const task = {
        id: docSnap.id,
        ...data,
        startTime: data.startTime?.toDate(),
        endTime: data.endTime?.toDate() || null,
    };

    //Creating log for delaying task
    console.log("ALO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const tomorrow = new Date(task.startTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    await createLog(`Task ${task.title} was delayed for ${formatDateMonthName(tomorrow, false, true)}`, user.id);

    //Calculate task duration + rest time
    let taskDuration;
    if (task.startTime && task.endTime) {
        const originalDuration = task.endTime.getTime() - task.startTime.getTime();
        taskDuration = originalDuration;
    }

    //Compute new start time (next day at user-preferred start)
    const userStartTime = getDateFromStartTime(user.preferences.dayStartTime);

    //Set new task times
    task.startTime = userStartTime;
    if (task.endTime) {
        task.endTime = new Date(userStartTime.getTime() + taskDuration);
    }

    const allUpdatedTasks = await getEveryTaskForTomorrow(taskDuration, userStartTime, Number(user.preferences.min_rest_time_between_tasks), user.id);

    if (allUpdatedTasks.length == 0) {
        const delayedTaskRef = doc(db, "Tasks", task.id);

        updateDoc(delayedTaskRef, task);
        return;
    }

    task.delayed.isDelayed = true;
    task.delayed.delayedTimes = task.delayed.delayedTimes + 1;

    allUpdatedTasks.unshift(task);

    allUpdatedTasks.forEach(task => {
        const docRef = doc(db, "Tasks", task.id);

        updateDoc(docRef, task);
    });
};

export const deleteTask = async (taskObject, userId) => {
    //If the task is repeating do not delete it but mark it as completed for the current day
    if (taskObject.repeating.isRepeating && taskObject.completed) {
        const docRef = doc(db, "Tasks", taskObject.id);

        updateDoc(docRef, {
            completed: taskObject.completed,
        });
        return;
    }

    try {
        const docRef = doc(db, "Tasks", taskObject.id);

        //Create proper notifications and logs
        if (taskObject.completed) {
            await createLog(`Completed task: ${taskObject.title}`, userId);
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

//Used only for clearing the database for test purposes
export const deleteEveryTask = async () => {
    const querySnapshot = await getDocs(collection(db, "Tasks"));

    querySnapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "Tasks", docSnap.id))
    );
}