import { format } from "date-fns";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isSameDay, parseISO } from "date-fns";
import { ScrollView } from "react-native-gesture-handler";
import { formatDateMonthName } from "../../utils/dateUtil";
import { useRef } from "react";

export default function EventsMonthView({ month, theme, font }) {
  //Used in order to scroll to the bottom of the scroll view
  const scrollViewRef = useRef(null);

  //Function that checks on a given day if there is an event
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
      fontFamily: font.bold,
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
      fontFamily: font.regular,
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
      paddingBottom: 20,
      display: "flex",
      gap: 15,
    },

    eventsBox: {
      borderWidth: 1,
      borderColor: theme.secondary,
      backgroundColor: theme.background,
      padding: 10,
      display: "flex",
    },

    eventBoxMonthName: {
      color: theme.secondary,
      fontSize: 12,
      fontFamily: font.regular,
    },

    eventBoxEventName: {
      color: theme.secondary,
      fontSize: 15,
      fontFamily: font.regular,
    },
  });

  return (
    <ScrollView ref={scrollViewRef} style={styles.monthContainer}>
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
            <TouchableOpacity
              onPress={() => {
                scrollViewRef.current.scrollToEnd();
              }}
            >
              <Text
                style={{
                  color: theme.text,
                  fontSize: 15,
                  fontFamily: font.regular,
                }}
              >
                {format(day, "d")}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.eventsBoxesDiv}>
        {month.events.length == 0 ? (
          <Text style={[styles.monthTitle, { marginBottom: 20 }]}>
            No events for this month
          </Text>
        ) : (
          month.events.map((event, index) => (
            <View key={index} style={styles.eventsBox}>
              <Text style={styles.eventBoxMonthName}>
                {formatDateMonthName(new Date(event.startDate), false)}
              </Text>
              <Text style={styles.eventBoxEventName}>{event.title}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
