const now = new Date();

export const DUMMY_DATA_TASKS = [
    {
        id: "OjTPAQMki5gyFwBWgCMZ",
        userId: "",
        title: "The gym",
        description: "Go to the fucking gym my man",
        priority: 3,
        stressLevel: 3,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 15),
        endTime: null,
        duration: 0,
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
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
        duration: this.startTime - this.endTime,
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
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
        duration: this.startTime - this.endTime,
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        completed: false,
    }
];
