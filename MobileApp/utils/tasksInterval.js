import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { exampleTasks } from "../constants/testDummyData";
import { equalDatesWithHours } from "./dateUtil";

//Function that manage to set min interval between the new task and closest to it on the past
export const taskInterval = async (newTask, min_rest_time_between_tasks, previousTask = null) => {
    const tasksCollection = collection(db, "Tasks");

    console.log(min_rest_time_between_tasks);

    let closestTaskOnPast;

    if (previousTask === null) {
        console.log("ARE Shonshi");
        //Gets the closest task on the past
        const q = query(tasksCollection, where("startTime", "<", Timestamp.fromDate(newTask.startTime)), orderBy("startTime", "asc"));

        const snapshot = await getDocs(q);

        console.log(Timestamp.fromDate(newTask.startTime));
        console.log(snapshot);

        //In case this is the first task or there is not task more on the past than this one
        if (snapshot.empty) {
            return newTask;
        }
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        //closestTaskOnPast = snapshot.docs[0].data();
        closestTaskOnPast = tasks[tasks.length - 1];
        closestTaskOnPast.startTime = closestTaskOnPast.startTime.toDate();
        if (closestTaskOnPast.endTime) {
            closestTaskOnPast.endTime = closestTaskOnPast.endTime.toDate();
        }
        console.log("closestTaskOnPast ", closestTaskOnPast);
    }
    else {
        closestTaskOnPast = { ...previousTask };
    }

    //If there is not task duration
    if (!newTask.endTime) {
        //If bot closest task and new task does not have duration
        if (closestTaskOnPast.endTime === null) {
            //In case the differences between the tasks is less than the minimum rest time between the tasks
            if (closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                newTask.startTime = new Date(closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks);
            }

            return newTask;
        }
        //If the closest task has duration but the new does not
        else {
            //If the task startTime is inside the nearest task duration || OR || If the closest task end time plus the min rest time is bigger that the new task start time
            if (closestTaskOnPast.endTime.getTime() > newTask.startTime.getTime() || closestTaskOnPast.endTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                //Sets the start time to be the min rest time after the end time of the closest task
                newTask.startTime = new Date(closestTaskOnPast.endTime.getTime() + min_rest_time_between_tasks);
            }

            return newTask;
        }
    }
    //If the new inserted task has duration
    else {
        //Calculates the duration between start and end time on milliseconds
        const newTaskDurationOnMilliseconds = newTask.endTime.getTime() - newTask.startTime.getTime();
        if (!closestTaskOnPast.endTime) {
            //If the closest task start time is inside the interval of the new task
            if (closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                newTask.startTime = new Date(closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks);
                newTask.endTime = new Date(newTask.startTime.getTime() + newTaskDurationOnMilliseconds);
            }

            return newTask;
        }
        //If both newTask and closest task have duration
        else {
            //If the new task start time is close to the beginning of the closest task
            if (closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                newTask.startTime = new Date(closestTaskOnPast.endTime.getTime() + min_rest_time_between_tasks);
                newTask.endTime = new Date(newTask.startTime.getTime() + newTaskDurationOnMilliseconds);
            }
            //If the new task interval is inside the closest task interval
            else if (newTask.startTime.getTime() < closestTaskOnPast.endTime.getTime()) {
                newTask.startTime = new Date(closestTaskOnPast.endTime.getTime() + min_rest_time_between_tasks);
                newTask.endTime = new Date(newTask.startTime.getTime() + newTaskDurationOnMilliseconds);
            }
            //If the new task start time is close to the closest endTime
            else if (closestTaskOnPast.endTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                newTask.startTime = new Date(closestTaskOnPast.endTime.getTime() + min_rest_time_between_tasks);
                newTask.endTime = new Date(newTask.startTime.getTime() + newTaskDurationOnMilliseconds);
            }

            return newTask;
        }
    }
}

export const featureTasksCompiler = async (currentTask, min_rest_time_between_tasks) => {
    const tasksCollection = collection(db, "Tasks");

    //Gets the closest task on the feature
    const q = query(tasksCollection, where("startTime", ">", Timestamp.fromDate(currentTask.startTime)), orderBy("startTime", "asc"), limit(1));

    const snapshot = await getDocs(q);

    console.log("Manqk are molq ti sa");
    console.log(snapshot);

    //In case this is the first task or there is not task more on the feature than this one
    if (snapshot.empty) {
        return;
    }

    //Gets the current feature task and modifiable copy of it
    const docSnap = snapshot.docs[0];

    const currentFeatureTask = { id: docSnap.id, ...docSnap.data() };
    currentFeatureTask.startTime = currentFeatureTask.startTime.toDate();
    if (currentFeatureTask.endTime) {
        currentFeatureTask.endTime = currentFeatureTask.endTime.toDate();
    }
    console.log("currentFeatureTask", currentFeatureTask);
    let modifiableFeatureTask = { ...currentFeatureTask };
    console.log("modifiableFeatureTask", modifiableFeatureTask);

    modifiableFeatureTask = await taskInterval(modifiableFeatureTask, min_rest_time_between_tasks, currentTask);

    console.log("After changes modifiableFeatureTask ", modifiableFeatureTask);

    //If nothing has changed that means the recursion should end
    if (equalDateValuesOfObjects(currentFeatureTask, modifiableFeatureTask)) {
        return;
    }
    //Modifies the document on the database and calls for the next function
    else {
        const docRef = doc(db, "Tasks", modifiableFeatureTask.id);
        await updateDoc(docRef, modifiableFeatureTask);
        await featureTasksCompiler(modifiableFeatureTask, min_rest_time_between_tasks);
    }
}

//Function for testing the featureTasksCompiler function without requests to the database
export const featureTasksCompilerTester = async (currentTask, min_rest_time_between_tasks, index = 1) => {
    if (exampleTasks.length <= index) {
        console.log("END");
        return;
    }
    const currentFeatureTask = structuredClone(exampleTasks[index]);
    let modifiableFeatureTask = structuredClone(currentFeatureTask);

    // Fix Date fields
    modifiableFeatureTask.startTime = new Date(modifiableFeatureTask.startTime);
    if (modifiableFeatureTask.endTime) {
        modifiableFeatureTask.endTime = new Date(modifiableFeatureTask.endTime);
    }

    modifiableFeatureTask = await taskInterval(modifiableFeatureTask, min_rest_time_between_tasks, currentTask);

    if (equalDateValuesOfObjects(currentFeatureTask, modifiableFeatureTask)) {
        console.log("END");
        return;
    }
    else {
        console.log("Current feature task:", index);
        console.log(modifiableFeatureTask);
        await featureTasksCompilerTester(modifiableFeatureTask, min_rest_time_between_tasks, index + 1);
    }
}

//Function that checks if there are changes on the date objects of the current and past task
function equalDateValuesOfObjects(obj1, obj2) {
    if (equalDatesWithHours(obj1.startTime, obj2.startTime)) {
        if (obj1.endTime) {
            if (obj2.endTime) {
                if (equalDatesWithHours(obj1.endTime, obj2.endTime)) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }

    return false;
}