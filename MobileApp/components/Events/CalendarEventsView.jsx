import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
  isSameMonth,
  parseISO,
} from "date-fns";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useMemo, useState } from "react";
import EventsMonthView from "./EventsMonthView";

import Fontisto from "@expo/vector-icons/Fontisto";

export default function CalendarEventsView({
  calendarName,
  events,
  theme,
  closeCalendar,
}) {
  //The width of the parent component, used from the Carousel
  const [parentWidth, setParentWidth] = useState(0);

  const today = new Date();

  //Generates data for a given start date of a month and also for the given events filter all events from the current month
  const monthData = useMemo(() => {
    const today = new Date();

    function generateMonthData(startDate) {
      const start = startOfMonth(startDate);
      const end = endOfMonth(startDate);
      const days = eachDayOfInterval({ start, end });

      //Gets just the events for the current month
      const monthEvents = events.filter((event) =>
        isSameMonth(parseISO(event.startDate), start)
      );

      return {
        title: format(startDate, "MMMM yyyy"),
        days,
        events: monthEvents,
      };
    }

    const months = [];
    for (let i = 0; i <= 3; i++) {
      const monthDate = addMonths(today, i);
      months.push(generateMonthData(monthDate));
    }

    return months;
  }, [events]);

  const styles = StyleSheet.create({
    mainDiv: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: 400,
      backgroundColor: theme.primary,
      zIndex: 100,
      borderWidth: 5,
      borderColor: theme.highlight,
      padding: 10,
      display: "flex",
      alignItems: "center",
    },
    currentMonth: {
      fontSize: 18,
      color: theme.text,
      marginBottom: 3,
    },

    closeButton: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "red",
      padding: 8,
    },
  });

  return (
    <View
      style={styles.mainDiv}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      }}
    >
      <Text style={styles.currentMonth}>{calendarName}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={closeCalendar}>
        <Fontisto name="close-a" size={20} color="black" />
      </TouchableOpacity>
      {parentWidth > 0 && (
        <Carousel
          loop={false}
          width={parentWidth}
          height={400}
          autoPlay={false}
          data={monthData}
          scrollAnimationDuration={1000}
          renderItem={({ item, index }) => (
            <EventsMonthView month={item} theme={theme} />
          )}
        />
      )}
    </View>
  );
}
