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
        repeatInterval: null
    },
    completed: false,
};