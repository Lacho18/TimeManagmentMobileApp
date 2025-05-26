import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { TASK_PRIORITIES } from "../../constants/TaskPriority";

export default function PrioritySelect({ selectedPriority, changePriority }) {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 10,
    },
    buttonStyle: {
      width: "auto",
      minWidth: 60,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      padding: 10,
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
            key={priority.textDescription}
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
