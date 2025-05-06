import { StyleSheet, Text, View } from "react-native";
import { WEEK_DAYS } from "../../constants/DateConstants";

export default function DayOfWeek({ daysFromWeek, theme, selectedDate }) {
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

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
    dayNumberTextSelected: {
      backgroundColor: "orange",
      borderRadios: "50%",
    },
  });

  return (
    <View style={styles.mainDiv}>
      {daysFromWeek.map((day) => {
        const dayName = WEEK_DAYS[day.getDay()];
        const dayNumber = day.getDate();

        console.log(
          "----------------------------------------------------------------------------"
        );
        console.log(selectedDate === day ? styles.dayNumberTextSelected : null);
        console.log(
          "----------------------------------------------------------------------------"
        );

        return (
          <View style={styles.dayView}>
            <Text style={styles.dayNameText}>{dayName}</Text>
            <Text
              style={[
                styles.dayNumberText,
                isSameDay(selectedDate, day) && styles.dayNumberTextSelected,
              ]}
            >
              {dayNumber}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
