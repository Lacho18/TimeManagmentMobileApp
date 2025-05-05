import { StyleSheet, Text, View } from "react-native";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

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
  });

  return (
    <View style={styles.mainDiv}>
      {daysFromWeek.map((day) => {
        const dayName = WEEK_DAYS[day.getDay()];
        const dayNumber = day.getDate();
        return (
          <View style={styles.dayView}>
            <Text>{dayName}</Text>
            <Text>{dayNumber}</Text>
          </View>
        );
      })}
    </View>
  );
}
