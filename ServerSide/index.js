const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cron = require("node-cron");
const cors = require('cors');

const PORT = 8080;

app.use(cors());

app.use(bodyParser.json());

const admin = require("firebase-admin");

const serviceAccount = require("./timemanagmentproject-455119-firebase-adminsdk-fbsvc-96ea7cc9d0.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/*
    1. All tasks for the current day which are not complete will be delayed for the next day increasing it's delay counter
    2. User will be able to insert stress level
*/
cron.schedule("0 0 * * *", async () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const allTasksForTodaySnapShot = await db.collection("Tasks")
        .where("startTime", ">=", startOfDay)
        .where("startTime", "<=", endOfDay)
        .get();

    const allTasksForToday = allTasksForTodaySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const batch = db.batch();

    allTasksForTodaySnapShot.forEach((doc) => {
        const data = doc.data();

        // Preserve time from original startTime
        const originalStart = data.startTime.toDate();
        const updatedStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), originalStart.getHours(), originalStart.getMinutes(), originalStart.getSeconds());

        const updateData = {
            startTime: admin.firestore.Timestamp.fromDate(updatedStart),
        };

        if (data.endTime) {
            const originalEnd = data.endTime.toDate();
            const updatedEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), originalEnd.getHours(), originalEnd.getMinutes(), originalEnd.getSeconds());

            updateData.endTime = admin.firestore.Timestamp.fromDate(updatedEnd);
        }

        batch.update(doc.ref, updateData);
    });

    const userSnapShot = await db.collection("Users").get();

    userSnapShot.forEach((doc) => {
        const docRef = doc.ref;

        batch.update(docRef, {
            insertedTodayStressLevel: false,
        });
    });
});

app.get('/', (req, res) => {
    return res.send("<h1>Test whether server is working!</h1>");
});

app.listen(PORT, () => {
    console.log("App listen on port: " + PORT);
});