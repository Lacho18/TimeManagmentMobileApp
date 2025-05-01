import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { getTaskForGivenDay } from "../../database/taskController";

export default function DailyTasks() {
  const { theme } = useTheme();
  const { loading } = useUser();
  const [allDailyTasks, setAllDailyTasks] = useState([]);

  useEffect(() => {
    async function getTodayTasks() {
      const result = await getTaskForGivenDay(new Date());

      if (result.length > 0) {
        setAllDailyTasks(result);
      }
    }

    getTodayTasks();
  });

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: theme.background,
      padding: 10,
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
      <View>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subTitle}>{allDailyTasks.length} tasks</Text>
      </View>
    </View>
  );
}
