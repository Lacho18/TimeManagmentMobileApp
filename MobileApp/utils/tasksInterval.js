import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";
import { exampleTasks } from "../constants/testDummyData";
import { equalDatesWithHours } from "./dateUtil";

//Function that manage to set min interval between the new task and closest to it on the past
export const taskInterval = async (newTask, min_rest_time_between_tasks, previousTask = null) => {
    const tasksCollection = collection(db, "tasks");

    let closestTaskOnPast;

    if (previousTask === null) {
        //Gets the closest task on the past
        const q = query(tasksCollection, where("startTime", "<", newTask.startTime), orderBy("startTime", "desc"), limit(1));

        const snapshot = await getDocs(q);

        //In case this is the first task or there is not task more on the past than this one
        if (snapshot.empty) {
            return newTask;
        }

        closestTaskOnPast = snapshot.docs[0].data();
    }
    else {
        closestTaskOnPast = { ...previousTask };
    }

    console.log("ALOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
    console.log("This is new task: ", newTask);
    console.log("This is current task on past: ", closestTaskOnPast);

    //If there is not task duration
    if (!newTask.endTime) {
        //If bot closest task and new task does not have duration
        if (closestTaskOnPast.endTime === null) {
            //In case the differences between the tasks is less than the minimum rest time between the tasks
            if (closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                newTask.startTime = new Date(closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks);
            }

            console.log("Emi towa trqbva da widq");

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

            console.log("Neshto aloooo");
            if (closestTaskOnPast.startTime.getTime() + min_rest_time_between_tasks > newTask.startTime.getTime()) {
                console.log("Ne bi trqbvalo da te vishdam");
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
    const tasksCollection = collection(db, "tasks");

    //Gets the closest task on the feature
    const q = query(tasksCollection, where("startTime", ">", currentTask.startTime), orderBy("startTime", "asc"), limit(1));

    const snapshot = await getDocs(q);

    //In case this is the first task or there is not task more on the feature than this one
    if (snapshot.empty) {
        return currentTask;
    }

    //Gets the current feature task and modifiable copy of it
    const docSnap = snapshot.docs[0];
    const currentFeatureTask = { id: docSnap.id, ...docSnap.data() };
    let modifiableFeatureTask = { ...currentFeatureTask };

    modifiableFeatureTask = await taskInterval(modifiableFeatureTask, min_rest_time_between_tasks, currentTask);

    //If nothing has changed that means the recursion should end
    if (equalDateValuesOfObjects(currentFeatureTask, modifiableFeatureTask)) {
        return;
    }
    //Modifies the document on the database and calls for the next function
    else {
        const docRef = doc(db, "tasks", modifiableFeatureTask.id);
        await updateDoc(docRef, modifiableFeatureTask);
        await featureTasksCompiler(modifiableFeatureTask, min_rest_time_between_tasks);
    }
}

export const featureTasksCompilerTester = async (currentTask, min_rest_time_between_tasks, index = 1) => {
    const currentFeatureTask = structuredClone(exampleTasks[index]);
    let modifiableFeatureTask = structuredClone(currentFeatureTask);

    // Fix Date fields
    modifiableFeatureTask.startTime = new Date(modifiableFeatureTask.startTime);
    if (modifiableFeatureTask.endTime) {
        modifiableFeatureTask.endTime = new Date(modifiableFeatureTask.endTime);
    }

    /*console.log("This is the current task");
    console.log(currentTask);
    console.log("<><><>?<>?<>?<?<>?<>?<?><>?<>?<>?<>?<?<>?<>?<?><?<?><>?<>?><>");

    console.log("Delta in minutes: ",
        (modifiableFeatureTask.startTime.getTime() - currentFeatureTask.startTime.getTime()) / 60000);

    console.log("EI MAYKA MY DA EBAAAAA");
    console.log(modifiableFeatureTask);*/

    console.log("Before", modifiableFeatureTask);
    modifiableFeatureTask = await taskInterval(modifiableFeatureTask, min_rest_time_between_tasks, currentTask);
    console.log("After: ", modifiableFeatureTask);
    console.log("After Again: ", currentFeatureTask);
    console.log(equalDateValuesOfObjects(currentFeatureTask, modifiableFeatureTask));

    if (equalDateValuesOfObjects(currentFeatureTask, modifiableFeatureTask)) {
        console.log("KRAY");
        return;
    }
    /*else {
        console.log("Current feature task:", index);
        console.log(modifiableFeatureTask);
        await featureTasksCompilerTester(modifiableFeatureTask, min_rest_time_between_tasks, index + 1);
    }*/
}

function equalDateValuesOfObjects(obj1, obj2) {
    console.log(equalDatesWithHours(obj1.startTime, obj2.startTime));
    console.log(obj2.startTime);
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