import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as Calendar from "expo-calendar";

export default function CalendarBoxView({
  calendar,
  theme,
  selectCalendar,
  unselectCalendar,
  hasNoEvents,
}) {
  async function getCurrentCalendarEvents() {
    if (hasNoEvents) {
      unselectCalendar();
      return;
    }

    const startDate = new Date();
    const endDate = new Date();

    //Start date now
    startDate.setMonth(startDate.getMonth());
    //End date an year ahead
    endDate.setMonth(endDate.getMonth() + 12);

    //Gets the events of the selected calendar from the start date to the end date
    const events = await Calendar.getEventsAsync(
      [calendar.id],
      startDate,
      endDate
    );

    //Stops the scroll view of the parent component and opens the calendar
    selectCalendar(events, calendar.name);
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: 75,
      borderWidth: 5,
      borderColor: theme.accent,
      backgroundColor: theme.secondary,
      padding: 5,
    },
    contextDiv: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
    },
    calendarName: {
      flexBasis: "80%",
      fontSize: 15,
      color: theme.background,
    },
    showEventsButton: {
      flexBasis: "20%",
      display: "flex",
      alignItems: "flex-end",
    },
    noEventsTextDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.secondary,
      borderWidth: 5,
      borderColor: theme.accent,
      borderTopWidth: 0,
      paddingVertical: 3,
    },
    noEventsText: {
      fontSize: 15,
      color: "red",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View style={styles.contextDiv}>
        <Text style={styles.calendarName}>{calendar.name}</Text>
        <TouchableOpacity
          style={styles.showEventsButton}
          onPress={getCurrentCalendarEvents}
        >
          <AntDesign name="caretdown" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {hasNoEvents && (
        <View style={styles.noEventsTextDiv}>
          <Text style={styles.noEventsText}>No events for this calendar</Text>
        </View>
      )}
    </View>
  );
}
