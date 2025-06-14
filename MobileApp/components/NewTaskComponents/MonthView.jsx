import { format } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MonthView({ month, theme, onDateSelect, dateType }) {
  const styles = StyleSheet.create({
    monthContainer: {
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    monthTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.text,
      marginVertical: 8,
    },
    weekDays: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    weekDay: {
      width: "14.28%",
      textAlign: "center",
      fontWeight: "600",
      color: theme.text,
    },
    daysGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    dayCell: {
      width: "14.28%",
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthTitle}>{month.title}</Text>
      <View style={styles.weekDays}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Text style={styles.weekDay} key={day}>
            {day}
          </Text>
        ))}
      </View>
      <View style={styles.daysGrid}>
        {Array(month.days[0].getDay())
          .fill("")
          .map((_, idx) => (
            <View key={`empty-${idx}`} style={styles.dayCell} />
          ))}
        {month.days.map((day) => (
          <View key={day.toISOString()} style={styles.dayCell}>
            <TouchableOpacity
              onPress={() => {
                onDateSelect(dateType, day);
              }}
            >
              <Text style={{ color: theme.text, fontSize: 15 }}>
                {format(day, "d")}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
