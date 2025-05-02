import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { getTaskForGivenDay } from "../../database/taskController";
import TaskViewComponent from "../../components/DailyTasks/TaskViewComponent";
import SelectedTask from "../../components/DailyTasks/SelectedTask";
import { DUMMY_DATA_TASKS } from "../../constants/dummyData";

export default function DailyTasks() {
  const { theme } = useTheme();
  const { loading } = useUser();
  const [allDailyTasks, setAllDailyTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    async function getTodayTasks() {
      //const result = await getTaskForGivenDay(new Date());

      const result = DUMMY_DATA_TASKS;

      if (result.length > 0) {
        setAllDailyTasks(result);
      }
    }

    getTodayTasks();
  }, []);

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 10,
      gap: 15,
      position: "relative",
    },

    title: {
      fontSize: 30,
      color: theme.text,
      fontWeight: "bold",
    },

    subTitle: {
      fontSize: 18,
      color: theme.text,
    },

    tasksDiv: {
      width: "100%",
    },

    tasksContainerStyle: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 20,
    },
  });

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subTitle}>{allDailyTasks.length} tasks</Text>
      </View>
      <ScrollView
        vertical
        style={styles.tasksDiv}
        contentContainerStyle={styles.tasksContainerStyle}
      >
        {allDailyTasks.map((task) => (
          <TaskViewComponent
            key={task.id}
            theme={theme}
            task={task}
            selectTask={(selection) => {
              setSelectedTask(selection);
            }}
          />
        ))}
      </ScrollView>

      {selectedTask && (
        <SelectedTask
          selectedTask={selectedTask}
          theme={theme}
          hideTask={() => {
            setSelectedTask(null);
          }}
        />
      )}
    </View>
  );
}
