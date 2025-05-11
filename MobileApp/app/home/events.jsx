import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGoogleCalendarEvents } from "../../functions/getGoogleCalendarEvents";

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

  console.log(googleToken);

  const styles = StyleSheet.create({
    mainDiv: {
      flex: 1,
      backgroundColor: theme.background,
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
      <Text>Events</Text>
    </ScrollView>
  );
}
