import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGoogleCalendarEvents } from "../../functions/getGoogleCalendarEvents";
import SingleEventBoxView from "../../components/Events/SingleEventBoxView";

/*
  1. Opravi stilovo eventite
  2. Napravi taka che da ne moje da se dobavq zadacha ako se zastupva s druga takava ili sus subitie
  3. Dobavi opciq za postavqne na locaciq za zadachata
*/

export default function Events() {
  const { theme } = useTheme();
  const [googleEvents, setGoogleEvents] = useState([]);

  useEffect(() => {
    async function getGoogleToken() {
      const token = await AsyncStorage.getItem("@token");

      if (token) {
        const eventsData = await getGoogleCalendarEvents(token);

        setGoogleEvents(eventsData);
      }
    }

    getGoogleToken();
  }, []);

  console.log(googleEvents);

  const styles = StyleSheet.create({
    mainDiv: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: 30,
    },
    tasksContainerStyle: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 10,
    },
    title: {
      fontSize: 30,
      color: theme.text,
      fontWeight: "bold",
      alignSelf: "flex-start",
      marginLeft: 10,
    },
    subTitle: {
      fontSize: 18,
      color: theme.text,
      alignSelf: "flex-start",
      marginLeft: 10,
      marginBottom: 10,
    },
  });

  return (
    <ScrollView
      style={styles.mainDiv}
      contentContainerStyle={styles.tasksContainerStyle}
    >
      <Text style={styles.title}>Events</Text>
      <Text style={styles.subTitle}>{googleEvents.length} events</Text>
      {googleEvents.map((event) => (
        <SingleEventBoxView key={event.id} event={event} theme={theme} />
      ))}
    </ScrollView>
  );
}
