const now = new Date();

export const exampleTasks = [
    {
        id: "task1",
        userId: "123",
        title: "Morning Review",
        description: "Check emails and calendar",
        priority: 2,
        stressLevel: 3,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
        endTime: null,
        duration: 0,
        durationColor: "#911c8b",
        location: "City: Sofia, Street: Alexander Malinov",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        completed: false
    },
    {
        id: "task2",
        userId: "123",
        title: "Team Standup",
        description: "Daily sync meeting",
        priority: 1,
        stressLevel: 2,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 40),
        duration: 15 * 60 * 1000,
        durationColor: "#911c8b",
        location: "City: Sofia, Street: Vitosha Blvd",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        completed: false
    },
    {
        id: "task3",
        userId: "123",
        title: "Test task",
        description: "1234567890",
        priority: 1,
        stressLevel: 4,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 45),
        duration: 15 * 60 * 1000,
        durationColor: "#911c8b",
        location: "City: Sofia, Street: Car Osvoboditel",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        completed: false
    },
    {
        id: "task4",
        userId: "123",
        title: "Deep Work Session",
        description: "Focus on main project task",
        priority: 3,
        stressLevel: 5,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
        duration: 60 * 60 * 1000,
        durationColor: "#911c8b",
        location: "City: Sofia, Street: Rakovski",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        completed: false
    },
    {
        id: "task5",
        userId: "123",
        title: "Client Call",
        description: "Weekly check-in with client",
        priority: 2,
        stressLevel: 3,
        startTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 15),
        endTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45),
        duration: 30 * 60 * 1000,
        durationColor: "#911c8b",
        location: "City: Sofia, Street: Tsarigradsko Shose",
        reminder: null,
        repeating: {
            isRepeating: false,
            repeatInterval: null
        },
        completed: false
    }
];
