import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useUser } from "../../context/UserContext";
import { useEffect, useState, useRef } from "react";
import { STRESS_LEVELS } from "../../constants/StressLevel";

const MAX_WORK_HOURS = 24 - 8;
const HOURS_RANGE = 50;
const MIN_TASK_WIDTH = 25;
const MIN_TASK_HEIGHT = 30;

export default function DailyTasksSimpleView({ theme, font, allDailyTasks }) {
  const { user } = useUser();
  const [userWorkHours, setUserWorkHours] = useState([]);

  const userStartHour = useRef(
    Number(user.preferences.dayStartTime.split(":")[0])
  );

  useEffect(() => {
    const userMinutes = user.preferences.dayStartTime.split(":")[1];
    const workHours = [];

    for (
      let i = userStartHour.current;
      i < MAX_WORK_HOURS + userStartHour.current;
      i++
    ) {
      workHours.push(`${i < 10 ? "0" + i : i}:${userMinutes}`);
    }

    setUserWorkHours(workHours);
    setTaskCoordinates({ startTime: new Date() });
  }, []);

  function setTaskCoordinates(task) {
    const yCoordinate =
      (task.startTime.getHours() - userStartHour.current) * HOURS_RANGE +
      (task.startTime.getMinutes() / 60) * HOURS_RANGE;
    let taskWidth = 0;
    let taskHeight = 0;

    const stressColors = STRESS_LEVELS.find(
      (indexValue) => indexValue.stressValue === task.stressLevel
    );

    if (!task.endTime) {
      taskWidth = MIN_TASK_WIDTH;
      taskHeight = MIN_TASK_HEIGHT;
    } else {
      console.log("Ebasi");
    }

    const taskVisualObject = {
      y: yCoordinate,
      taskWidth,
      taskHeight,
      title: task.title,
      background: stressColors,
    };

    return taskVisualObject;
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: 500,
      alignSelf: "center",
      marginTop: 40,
      backgroundColor: theme.accent,
      paddingLeft: 10,
    },

    mainDivMoreStyles: {
      flexDirection: "row",
    },

    hoursDiv: {
      display: "flex",
      width: 60,
      flexDirection: "column",
      gap: 50,
      borderRightWidth: 2,
      paddingVertical: 25,
      borderStyle: "dashed",
    },
  });

  return (
    <ScrollView
      vertical
      style={styles.mainDiv}
      contentContainerStyle={styles.mainDivMoreStyles}
    >
      <View style={styles.hoursDiv}>
        {userWorkHours.map((hour) => (
          <Text>{hour}</Text>
        ))}
      </View>
      <ScrollView></ScrollView>
    </ScrollView>
  );
}
