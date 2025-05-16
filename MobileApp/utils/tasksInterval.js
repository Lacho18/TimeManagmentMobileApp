import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from './firebase';

//Function that manage to set min interval between the new task and closest to it on the past
export const taskInterval = async (newTask, min_rest_time_between_tasks) => {
    const tasksCollection = collection(db, "tasks");

    //Gets the closest task on the past
    const q = query(tasksCollection, where("startTime", "<", newTask.startTime), orderBy("startTime", "desc"), limit(1));

    const snapshot = await getDocs(q);

    //In case this is the first task or there is not task more on the past than this one
    if (snapshot.empty) {
        return newTask;
    }

    //Gets the closest task
    const closestTaskOnPast = snapshot.docs[0].data();

    //If there is not task duration
    if (!newTask.endTime) {
        //If bot closest task and new task does not have duration
        if (!closestTaskOnPast.endTime) {
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

export const featureTasksCompiler = async (newTask, min_rest_time_between_tasks) => {
    const currentNewTask = newTask;

    const tasksCollection = collection(db, "tasks");

    //Gets the closest task on the past
    const q = query(tasksCollection, where("startTime", ">", newTask.startTime), orderBy("startTime", "desc"), limit(1));

    const snapshot = await getDocs(q);

    //In case this is the first task or there is not task more on the past than this one
    if (snapshot.empty) {
        return newTask;
    }
}