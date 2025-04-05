export default userModel = {
    email: "",
    password: null,
    preferences: {
        notification_time: "08:00",
        notification_sound: "",
        min_rest_time_between_tasks: 5000,              //5 minutes
        theme: "purple"
    },
    google_sync: false,
    stress_levels: [],
    current_stress_level: 0,
    expo_push_token: "",
};