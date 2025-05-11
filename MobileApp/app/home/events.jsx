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
  const [googleToken, setGoogleToken] = useState(null);
  const [googleEvents, setGoogleEvents] = useState([]);

  useEffect(() => {
    async function getGoogleToken() {
      const token = await AsyncStorage.getItem("@token");

      if (token) {
        setGoogleToken(token);
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
      gap: 20,
    },
  });

  return (
    <ScrollView
      style={styles.mainDiv}
      contentContainerStyle={styles.tasksContainerStyle}
    >
      {googleEvents.map((event) => (
        <SingleEventBoxView event={event} theme={theme} />
      ))}
    </ScrollView>
  );
}
