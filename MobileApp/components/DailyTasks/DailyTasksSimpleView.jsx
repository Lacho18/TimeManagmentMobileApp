import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useUser } from "../../context/UserContext";
import { useEffect, useState, useRef } from "react";
import { STRESS_LEVELS } from "../../constants/StressLevel";

const MAX_WORK_HOURS = 24 - 8;
const HOURS_RANGE = 70;
const MIN_TASK_WIDTH = 25;
const MIN_TASK_HEIGHT = 30;

export default function DailyTasksSimpleView({ theme, font, allDailyTasks }) {
  const { user } = useUser();
  const [userWorkHours, setUserWorkHours] = useState([]);
  const [visualTasks, setVisualTasks] = useState([]);

  console.log(allDailyTasks);

  const userStartHour = useRef(
    Number(user.preferences.dayStartTime.split(":")[0])
  );

  useEffect(() => {
    const userMinutes = user.preferences.dayStartTime.split(":")[1];
    const workHours = [];
    const visualTasks = [];

    for (
      let i = userStartHour.current;
      i < MAX_WORK_HOURS + userStartHour.current;
      i++
    ) {
      workHours.push(`${i < 10 ? "0" + i : i}:${userMinutes}`);
    }

    allDailyTasks.forEach((task) => {
      visualTasks.push(setTaskCoordinates(task));
    });

    setUserWorkHours(workHours);
    setVisualTasks(visualTasks);
  }, []);

  function setTaskCoordinates(task) {
    if (task.startTime.toDate) {
      task.startTime = task.startTime.toDate();
    }
    const yCoordinate =
      (task.startTime.getHours() - userStartHour.current) * HOURS_RANGE +
      (task.startTime.getMinutes() / 60) * HOURS_RANGE;
    let taskWidth = 0;
    let taskHeight = 0;

    console.log(yCoordinate + 35);

    const stressColors = STRESS_LEVELS.find(
      (indexValue) => indexValue.stressValue === task.stressLevel
    );

    if (!task.endTime) {
      taskWidth = MIN_TASK_WIDTH;
      taskHeight = MIN_TASK_HEIGHT;
    } else {
      if (task.endTime.toDate) {
        task.endTime = task.endTime.toDate();
      }
      const yEndCoordinate =
        (task.endTime.getHours() - userStartHour.current) * HOURS_RANGE +
        (task.endTime.getMinutes() / 60) * HOURS_RANGE;

      taskHeight = yEndCoordinate - yCoordinate;
      taskWidth = MIN_TASK_WIDTH;
    }

    const taskVisualObject = {
      y: yCoordinate + HOURS_RANGE,
      taskWidth,
      taskHeight,
      title: task.title,
      background: stressColors.backgroundColor,
    };

    return taskVisualObject;
  }

  console.log(visualTasks);

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: 500,
      alignSelf: "center",
      marginTop: 40,
      backgroundColor: theme.accent,
      paddingLeft: 10,
      position: "relative",
    },

    mainDivMoreStyles: {
      flexDirection: "row",
    },

    hoursDiv: {
      display: "flex",
      width: 60,
      flexDirection: "column",
      //gap: HOURS_RANGE,
      borderRightWidth: 2,
      paddingVertical: 35,
      borderStyle: "dashed",
    },
    taskBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      paddingHorizontal: 10,
      width: 250,
    },
    text: {
      fontSize: 18,
      color: theme.text,
      fontFamily: font.regular,
    },
  });

  return (
    <ScrollView
      vertical
      style={styles.mainDiv}
      contentContainerStyle={styles.mainDivMoreStyles}
    >
      <View style={styles.hoursDiv}>
        {userWorkHours.map((hour, index) => (
          <Text
            key={index}
            style={{
              marginBottom:
                index === userWorkHours.length - 1 ? 0 : HOURS_RANGE,
              color: theme.text,
            }}
          >
            {hour}
          </Text>
        ))}
      </View>
      <View>
        {visualTasks.map((task) => (
          <View
            style={[
              styles.taskBox,
              {
                position: "absolute",
                top: task.y,
                height: task.taskHeight,
                maxHeight: task.taskHeight,
                backgroundColor: task.background,
                zIndex: 120,
              },
            ]}
          >
            <Text style={styles.text}>{task.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
