import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { WEEK_DAYS } from "../../constants/DateConstants";
import { equalDates } from "../../utils/dateUtil";

export default function DayOfWeek({
  font,
  daysFromWeek,
  theme,
  selectedDate,
  pageNumber,
  dateSelectionHandler,
  firstWeekLength,
}) {
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
      fontFamily: font.regular,
    },
    dayNumberText: {
      fontSize: 20,
      color: theme.text,
      fontWeight: "bold",
      padding: 8,
      fontFamily: font.bold,
    },
    dayNumberTextSelected: {
      backgroundColor: theme.highlight,
      borderRadius: 7,
      fontFamily: font.regular,
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
          <View key={index} style={styles.dayView}>
            <Text style={styles.dayNameText}>{dayName}</Text>
            <TouchableOpacity
              onPress={() => {
                dateSelectionHandler(day, dateIndex);
              }}
            >
              <Text
                style={[
                  styles.dayNumberText,
                  equalDates(selectedDate, day) && styles.dayNumberTextSelected,
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
