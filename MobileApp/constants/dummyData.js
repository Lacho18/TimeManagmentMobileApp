const now = new Date();

export const DUMMY_DATA_TASKS = [
    {
        id: "OjTPAQMki5gyFwBWgCMZ",
        userId: "",
        title: "Make new email",
        description: "Create new email address with Gmail",
        priority: 3,
        stressLevel: 3,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 15),
        endTime: null,
        duration: 0,
        durationColor: "",
        location: "City: Gabrovo, Street: Asen Asenev",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        delayed: {
            isDelayed: true,
            delayedTimes: 1,
        },
        completed: false,
    },

    {
        id: "OjTPAQMki5gyFwBWgCMZ1",
        userId: "123",
        title: "Test task",
        description: "1234567890",
        priority: 1,
        stressLevel: 4,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 45),
        duration: 900000,
        durationColor: "#911c8b",
        location: "City: Sofia, Street: Car Osvoboditel",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        delayed: {
            isDelayed: false,
            delayedTimes: 0,
        },
        completed: false,
    },

    {
        id: "OjTPAQMki5gyFwBWgCMZ2",
        userId: "321",
        title: "Test task again",
        description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        priority: 4,
        stressLevel: 1,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 15),
        duration: 1500000,
        durationColor: "#f0f013",
        location: "City: Svishtov, Street: Mir 1",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        delayed: {
            isDelayed: true,
            delayedTimes: 2,
        },
        completed: false,
    }
];
