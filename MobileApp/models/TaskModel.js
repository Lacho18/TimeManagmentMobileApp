export default taskModel = {
    userId: "",
    title: "",
    description: "",
    priority: 0,
    stressLevel: 0,
    startTime: Date,
    duration: 0,
    reminder: Date,
    repeating: {
        isRepeating: false,
        repeatInterval: null
    },
    completed: false,
};