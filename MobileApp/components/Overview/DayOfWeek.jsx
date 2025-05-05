import { StyleSheet, Text, View } from "react-native";
import { WEEK_DAYS } from "../../constants/DateConstants";

export default function DayOfWeek({ daysFromWeek, theme }) {
  const styles = StyleSheet.create({
    mainDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 20,
      boxSizing: "border-box",
    },
    dayView: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    dayNameText: {
      fontSize: 18,
      color: theme.text,
      fontWeight: 300,
    },
    dayNumberText: {
      fontSize: 18,
      color: theme.primary,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.mainDiv}>
      {daysFromWeek.map((day) => {
        const dayName = WEEK_DAYS[day.getDay()];
        const dayNumber = day.getDate();
        return (
          <View style={styles.dayView}>
            <Text style={styles.dayNameText}>{dayName}</Text>
            <Text style={styles.dayNumberText}>{dayNumber}</Text>
          </View>
        );
      })}
    </View>
  );
}
