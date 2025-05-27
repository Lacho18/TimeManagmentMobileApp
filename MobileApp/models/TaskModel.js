export default taskModel = {
    userId: "",
    title: "",
    description: "",
    priority: 0,
    stressLevel: 0,
    startTime: null,
    endTime: null,
    duration: "",
    durationColor: "",
    location: "",
    reminder: null,
    delayed: {
        isDelayed: false,
        delayedTimes: 0,
    },
    repeating: {
        isRepeating: false,
        repeatStartTime: "08:00",
        repeatEndTime: "08:00",
    },
    completed: false,
};