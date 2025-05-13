import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

import * as Calendar from "expo-calendar";
import CalendarEventsView from "./CalendarEventsView";

export default function CalendarBoxView({
  calendar,
  theme,
  selectCalendar,
  unselectCalendar,
}) {
  const [currentCalendarEvents, setCurrentCalendarEvents] = useState(null);

  async function getCurrentCalendarEvents() {
    selectCalendar();
    const startDate = new Date();
    const endDate = new Date();

    startDate.setMonth(startDate.getMonth() - 6);
    endDate.setMonth(endDate.getMonth() + 6);

    const events = await Calendar.getEventsAsync(
      [calendar.id],
      startDate,
      endDate
    );

    setCurrentCalendarEvents(events);
  }

  console.log(currentCalendarEvents);

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
      {currentCalendarEvents &&
        (currentCalendarEvents.length > 0 ? (
          <View>
            <CalendarEventsView
              calendarName={calendar.name}
              events={currentCalendarEvents}
              theme={theme}
            />
          </View>
        ) : (
          <View>
            <Text>No events for this calendar</Text>
          </View>
        ))}
    </View>
  );
}
