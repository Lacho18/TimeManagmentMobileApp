import { format } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isSameDay, parseISO } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";
import { formatDateMonthName } from "../../utils/dateUtil";

export default function EventsMonthView({ month, theme }) {
  console.log("EY TYKA GLEDAY MAIKA MY DA EBA");
  console.log(month.events);

  function dayWithEvent(currentDay, events) {
    return events.some((event) =>
      isSameDay(currentDay, parseISO(event.startDate))
    );
  }

  const styles = StyleSheet.create({
    monthContainer: {
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    monthTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.accent,
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
      color: theme.background,
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
      margin: 3,
    },

    dayCellWithContext: {
      borderWidth: 3,
      borderColor: theme.secondary,
      borderRadius: 7,
    },

    eventDayCell: {
      backgroundColor: theme.secondary,
    },

    eventsBoxesDiv: {
      marginVertical: 25,
      display: "flex",
      gap: 15,
    },

    eventsBox: {
      borderWidth: 3,
      borderColor: theme.secondary,
      backgroundColor: theme.secondary,
      padding: 10,
      display: "flex",
    },

    eventBoxMonthName: {
      color: theme.background,
      fontSize: 12,
    },

    eventBoxEventName: {
      color: theme.background,
      fontSize: 15,
    },
  });

  return (
    <ScrollView style={styles.monthContainer}>
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
          <View
            key={day.toISOString()}
            style={[
              styles.dayCell,
              day !== "" ? styles.dayCellWithContext : null,
              dayWithEvent(day, month.events) ? styles.eventDayCell : null,
            ]}
          >
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: theme.background, fontSize: 15 }}>
                {format(day, "d")}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.eventsBoxesDiv}>
        {month.events.map((event, index) => (
          <View key={index} style={styles.eventsBox}>
            <Text style={styles.eventBoxMonthName}>
              {formatDateMonthName(new Date(event.startDate), false)}
            </Text>
            <Text style={styles.eventBoxEventName}>{event.title}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
