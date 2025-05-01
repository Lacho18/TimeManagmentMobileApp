import { StyleSheet, Text, View } from "react-native";
import { STRESS_LEVELS } from "../../constants/StressLevel";
import { TASK_PRIORITIES } from "../../constants/TaskPriority";

export default function TaskViewComponent({ theme, task }) {
  const styles = StyleSheet.create({
    mainDiv: {
      width: "95%",
      height: 300,
      backgroundColor: "green",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>Nigga</Text>
    </View>
  );
}
