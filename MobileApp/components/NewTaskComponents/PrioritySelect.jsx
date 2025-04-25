import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TASK_PRIORITIES } from "../constants/TaskPriority";

export default function OptionSelect({ selectedPriority, changePriority }) {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    buttonStyle: {
      width: 80,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
    },
  });

  return (
    <View style={styles.container}>
      {TASK_PRIORITIES.map((priority) => {
        return (
          <TouchableOpacity
            style={{
              ...styles.buttonStyle,
              backgroundColor:
                selectedPriority === priority.priorityValue
                  ? priority.lightColor
                  : priority.backgroundColor,
            }}
            onPress={() => changePriority("priority", priority.priorityValue)}
          >
            <Text>{priority.textDescription}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
