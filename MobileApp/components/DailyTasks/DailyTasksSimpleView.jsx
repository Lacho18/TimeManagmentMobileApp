import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { useEffect, useState, useRef } from "react";
import { STRESS_LEVELS } from "../../constants/StressLevel";

const MAX_WORK_HOURS = 24 - 8;
const HOURS_RANGE = 70;
const MIN_TASK_WIDTH = 25;
const MIN_TASK_HEIGHT = 5;

export default function DailyTasksSimpleView({
  theme,
  font,
  allDailyTasks,
  selectTask,
  onCompleteTask,
}) {
  const { user } = useUser();
  const [userWorkHours, setUserWorkHours] = useState([]);
  const [visualTasks, setVisualTasks] = useState([]);

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

    //visualTasks.splice(1, 1);

    setUserWorkHours(workHours);
    setVisualTasks(visualTasks);
  }, []);

  function setTaskCoordinates(task) {
    if (task.startTime.toDate) task.startTime = task.startTime.toDate();
    if (task.endTime?.toDate) task.endTime = task.endTime.toDate();

    const start =
      (task.startTime.getHours() - userStartHour.current) * HOURS_RANGE +
      (task.startTime.getMinutes() / 60) * HOURS_RANGE;

    let height = MIN_TASK_HEIGHT;
    if (task.endTime) {
      const end =
        (task.endTime.getHours() - userStartHour.current) * HOURS_RANGE +
        (task.endTime.getMinutes() / 60) * HOURS_RANGE;
      height = end - start;
    }

    const stressColors = STRESS_LEVELS.find(
      (indexValue) => indexValue.stressValue === task.stressLevel
    );

    return {
      id: task.id,
      y: start + 5,
      taskWidth: MIN_TASK_WIDTH,
      taskHeight: height - 1,
      title: task.title,
      background: stressColors.backgroundColor,
    };
  }

  function deleteVisualTask(taskId) {
    const newTasks = visualTasks.filter((task) => task.id !== taskId);
    setVisualTasks(newTasks);
  }

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
      position: "relative",
      display: "flex",
      width: 60,
      flexDirection: "column",
      borderRightWidth: 2,
      borderStyle: "dashed",
    },
    taskBox: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      paddingHorizontal: 10,
      width: 300,
    },
    text: {
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
              position: "absolute",
              top: index * HOURS_RANGE,
              color: theme.text,
            }}
          >
            {hour}
          </Text>
        ))}
      </View>
      <View>
        {visualTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            onPress={() => {
              let selectedTaskFromUser = allDailyTasks.find(
                (indexValue) => indexValue.id === task.id
              );
              selectTask(selectedTaskFromUser);
            }}
            onLongPress={() => {
              deleteVisualTask(task.id);
              onCompleteTask(task.id);
            }}
            delayLongPress={1000}
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
            <Text
              style={[
                styles.text,
                {
                  fontSize: task.taskHeight * 0.5,
                },
              ]}
            >
              {task.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
