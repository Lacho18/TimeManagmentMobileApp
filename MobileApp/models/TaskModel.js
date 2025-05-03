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
    reminder: null,
    repeating: {
        isRepeating: false,
        repeatInterval: null
    },
    completed: false,
};