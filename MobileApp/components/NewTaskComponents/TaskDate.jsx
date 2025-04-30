import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { formatDate } from "../../utils/dateUtil";

export default function TaskDate({
  theme,
  dateType,
  newTaskValue,
  openDateSelection,
  setFeatureDate,
}) {
  const styles = StyleSheet.create({
    labelText: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 500,
    },
    dateButtonsDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 5,
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: theme.background,
      borderRadius: 7,
      width: 100,
      height: 40,
      backgroundColor: theme.secondary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
      color: "orange",
    },
    dateVisualText: {
      color: "red",
      fontSize: 18,
      textAlign: "center",
      margin: 10,
    },
  });

  return (
    <View>
      <Text style={styles.labelText}>
        {dateType === "startTime" ? "Task date" : "End of task"}
      </Text>
      <View style={styles.dateButtonsDiv}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setFeatureDate(dateType, 0);
          }}
        >
          <Text style={styles.buttonText}>today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setFeatureDate(dateType, 1);
          }}
        >
          <Text style={styles.buttonText}>tomorrow</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            openDateSelection();
          }}
        >
          <Text style={styles.buttonText}>select date</Text>
        </TouchableOpacity>
      </View>
      {newTaskValue !== null && (
        <Text style={styles.dateVisualText}>
          Selected: {formatDate(newTaskValue)}
        </Text>
      )}
    </View>
  );
}
