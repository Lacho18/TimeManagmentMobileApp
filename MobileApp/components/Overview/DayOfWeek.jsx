import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WEEK_DAYS } from "../../constants/DateConstants";

export default function DayOfWeek({
  daysFromWeek,
  theme,
  selectedDate,
  pageNumber,
  dateSelectionHandler,
  firstWeekLength,
}) {
  function isSameDay(date1, date2) {
    if (!date1 || !date2) return false;
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
      color: theme.text,
      fontWeight: "bold",
      padding: 5,
    },
    dayNumberTextSelected: {
      backgroundColor: "#f58038",
      borderRadios: 15,
    },
  });

  return (
    <View style={styles.mainDiv}>
      {daysFromWeek.map((day, index) => {
        const dayName = WEEK_DAYS[day.getDay()];
        const dayNumber = day.getDate();
        let dateIndex = 0;

        if (pageNumber === 0) {
          dateIndex = index;
        } else {
          dateIndex = pageNumber * 7 + index - (7 - firstWeekLength);
        }

        return (
          <View style={styles.dayView}>
            <Text style={styles.dayNameText}>{dayName}</Text>
            <TouchableOpacity
              onPress={() => {
                dateSelectionHandler(day, dateIndex);
              }}
            >
              <Text
                style={[
                  styles.dayNumberText,
                  isSameDay(selectedDate, day) && styles.dayNumberTextSelected,
                ]}
              >
                {dayNumber}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
