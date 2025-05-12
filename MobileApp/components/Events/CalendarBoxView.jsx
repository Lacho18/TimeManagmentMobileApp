import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";

export default function CalendarBoxView({ calendar, theme }) {
  const [currentCalendarEvents, setCurrentCalendarEvents] = useState([]);

  function getCurrentCalendarEvents() {}

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
        <TouchableOpacity style={styles.showEventsButton}>
          <AntDesign name="caretdown" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
