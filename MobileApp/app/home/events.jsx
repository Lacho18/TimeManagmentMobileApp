import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getGoogleCalendarEvents } from "../../functions/getGoogleCalendarEvents";
import SingleEventBoxView from "../../components/Events/SingleEventBoxView";
import { useUser } from "../../context/UserContext";

import * as Calendar from "expo-calendar";

import CalendarBoxView from "../../components/Events/CalendarBoxView";

export default function Events() {
  const { theme } = useTheme();
  const { user } = useUser();

  //Events from google calendar
  const [googleEvents, setGoogleEvents] = useState([]);

  //Calendar from the device. Every calendar has events
  const [deviceCalendars, setDeviceCalendars] = useState([]);

  //The status of the device calendar. It should be "granted"
  const [calendarStatus, setCalendarStatus] = useState("");

  //Used to stop the scroll view when a calendar has been selected
  const [selectedDeviceCalendar, setSelectedDeviceCalendar] = useState(false);

  useEffect(() => {
    //Gets the google token and if it is valid gets the google calendar events of the user
    async function getGoogleToken() {
      const token = await AsyncStorage.getItem("@token");

      if (token) {
        const eventsData = await getGoogleCalendarEvents(token);

        setGoogleEvents(eventsData);
      }
    }

    //Function that gets the device calendars
    async function getDeviceCalendarData() {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      setCalendarStatus(status);

      //Gets device calendars if the permission is granted
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync();
        setDeviceCalendars(calendars);
      }
    }

    getGoogleToken();
    getDeviceCalendarData();
  }, []);

  const styles = StyleSheet.create({
    mainDiv: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: 50,
      paddingBottom: 100,
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
    eventsDiv: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 20,
    },
    eventsDivTitle: {
      display: "flex",
      flexDirection: "row",
      gap: 15,
      alignItems: "center",
      alignSelf: "flex-start",
      marginLeft: 10,
    },
    eventsDivTitleText: {
      fontSize: 18,
      color: theme.text,
    },
    deviceCalendarsDiv: {
      width: "90%",
      display: "flex",
      gap: 30,
    },
  });

  return (
    <ScrollView
      style={styles.mainDiv}
      contentContainerStyle={styles.tasksContainerStyle}
      scrollEnabled={!selectedDeviceCalendar}
    >
      <Text style={styles.title}>Events</Text>
      <Text style={styles.subTitle}>{googleEvents.length} events</Text>
      {user.google_sync && (
        <View style={styles.eventsDiv}>
          <View style={styles.eventsDivTitle}>
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/images/Google__G__logo.svg.png")}
            />
            <Text style={styles.eventsDivTitleText}>
              Google calendar events
            </Text>
          </View>
          {googleEvents.map((event) => (
            <SingleEventBoxView key={event.id} event={event} theme={theme} />
          ))}
        </View>
      )}
      {calendarStatus === "granted" ? (
        <View style={styles.deviceCalendarsDiv}>
          {deviceCalendars.map((calendar) => (
            <CalendarBoxView
              calendar={calendar}
              theme={theme}
              selectCalendar={() => setSelectedDeviceCalendar(true)}
              unselectCalendar={() => setSelectedDeviceCalendar(false)}
            />
          ))}
        </View>
      ) : (
        <Text>
          In order to see device events data, allow the application to use the
          device calendar
        </Text>
      )}
    </ScrollView>
  );
}
