import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { STRESS_LEVELS } from "../../constants/StressLevel";
import { TASK_PRIORITIES } from "../../constants/TaskPriority";
import { formatDateMonthName } from "../../utils/dateUtil";

export default function TaskViewComponent({ theme, task }) {
  const stressColors = STRESS_LEVELS.find(
    (indexValue) => indexValue.stressValue === task.stressLevel
  );
  const priorityColors = TASK_PRIORITIES.find(
    (indexValue) => indexValue.priorityValue === task.priority
  );

  const styles = StyleSheet.create({
    mainDiv: {
      width: "95%",
      height: 100,
      backgroundColor: stressColors.backgroundColor,
      borderWidth: 2,
      borderColor: stressColors.lightColor,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 7,
      gap: 10,
    },

    completeTaskButton: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      backgroundColor: priorityColors.backgroundColor,
      borderWidth: 5,
      borderColor: priorityColors.lightColor,
    },

    title: {
      fontSize: 18,
      color: stressColors.textColor,
      fontWeight: 500,
    },

    dateText: {
      fontSize: 16,
      color: stressColors.textColor,
      fontWeight: 400,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <TouchableOpacity style={styles.completeTaskButton}></TouchableOpacity>
      <View>
        <Text style={styles.title}>{task.title}</Text>
        {!task.endTime ? (
          <Text style={styles.dateText}>
            {formatDateMonthName(task.startTime)}
          </Text>
        ) : (
          <View>
            <Text style={styles.dateText}>
              {formatDateMonthName(task.startTime)} -{" "}
              {formatDateMonthName(task.endTime)}
            </Text>
            <Text>{task.duration}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
