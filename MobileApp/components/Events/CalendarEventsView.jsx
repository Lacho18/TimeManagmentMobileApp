import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
  isSameMonth,
  parseISO,
} from "date-fns";
import { StyleSheet, Text, View } from "react-native";
import MonthView from "../NewTaskComponents/MonthView";
import Carousel from "react-native-reanimated-carousel";
import { useMemo, useRef, useState } from "react";
import EventsMonthView from "./EventsMonthView";

/*
    Ideqta e za meseca da se vishda kato v tradicionen kalendar kato ako ima dni sus subitie te shte svetqt v dryg cvqt i mslko ksto se scrolne shte pishe datata i subitiqta
*/

export default function CalendarEventsView({ calendarName, events, theme }) {
  const [parentWidth, setParentWidth] = useState(0);

  const today = new Date();

  //Generates data for a given start date of a month and also for the given events filter all events from the current month
  const monthData = useMemo(() => {
    const today = new Date();

    function generateMonthData(startDate) {
      const start = startOfMonth(startDate);
      const end = endOfMonth(startDate);
      const days = eachDayOfInterval({ start, end });

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

  //console.log(monthData);

  const styles = StyleSheet.create({
    mainDiv: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -75%)",
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
