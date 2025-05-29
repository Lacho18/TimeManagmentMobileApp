export default userModel = {
    email: "",
    password: null,
    name: "",
    image: "",
    preferences: {
        dayStartTime: "08:00",
        notification_sound: "",
        min_rest_time_between_tasks: "300000",
        maxNumberOfTasks: 10,
        theme: "purple",
        simpleView: false,
    },
    google_sync: false,
    stress_levels: [],
    current_stress_level: 0,
    expo_push_token: "",
};