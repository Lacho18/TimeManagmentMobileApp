import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from './firebase';

export const taskInterval = async (newTask, min_rest_time_between_tasks) => {

    //If there is not task duration
    if (!newTask.endTime) {
        const tasksCollection = collection(db, "tasks");

        //Gets the closest task on the past
        const q = query(tasksCollection, where("startTime", "<", newTask.startTime), orderBy("startTime", "desc"), limit(1));

        const snapshot = await getDocs(q);

        //In case this is the first task or there is not task more on the past than this one
        if (snapshot.empty) {
            return newTask;
        }

        //Gets the closest task
        const closestTask = snapshot.docs[0].data();

        //If bot closest task and new task does not have duration
        if (!closestTask.endTime) {
            //In case the differences between the tasks is less than the minimum rest time between the tasks
            if (closestTask.startTime + min_rest_time_between_tasks > newTask.startTime) {
                newTask.startTime = closestTask.startTime + min_rest_time_between_tasks;
            }

            return newTask;
        }
        //If the closest task has duration but the new does not
        else {
            //If the task startTime is inside the nearest task duration
            if (closestTask.endTime > newTask.startTime) {
                //Sets the start time to be the min rest time after the end time of the closest task
                newTask.startTime = closestTask.endTime + min_rest_time_between_tasks;
            }
        }
    }
}