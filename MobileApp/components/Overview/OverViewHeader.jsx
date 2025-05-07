import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
//import { MONTHS } from "../../constants/Months";
import {
  WEEKS_AHEAD_OVERVIEW_VIEW,
  MONTHS,
} from "../../constants/DateConstants";
import { getCurrentWeek } from "../../utils/dateUtil";
import Carousel from "react-native-reanimated-carousel";
import DayOfWeek from "./DayOfWeek";

const screenWidth = Dimensions.get("window").width - 10;
const currentDate = new Date();

export default function OverViewHeader({
  theme,
  selectedDate,
  dateSelectionHandler,
}) {
  const weeksGroups = useRef(getGroupWeeksData());

  //Used from header selector of the dates in order to calculate the correct way the index of the date, so the scroll view can go to the right destination
  const firstWeekLength = useRef(weeksGroups.current[0].length);

  //Used to programmatically set the page of the carousel
  const carouselRef = useRef(null);
  const carouselPageRef = useRef(0);

  //console.log(carouselPageRef.current);

  const [currentMonth, setCurrentMonth] = useState();

  //Sets current month state when the current date is changed
  useEffect(() => {
    setCurrentMonth(
      `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`
    );

    //Goes to the different page if necessary
    calculateCarouselPage(selectedDate);
  }, [selectedDate]);

  //Groups all wanted weeks in a array
  function getGroupWeeksData() {
    const groups = [];
    const currentDate = new Date();

    for (let i = 0; i < WEEKS_AHEAD_OVERVIEW_VIEW; i++) {
      const group = getCurrentWeek(currentDate);

      groups.push(group);
      currentDate.setDate(currentDate.getDate() + 7);
    }

    return groups;
  }

  function goToPage(pageIndex) {
    carouselRef.current.scrollTo({ index: pageIndex, animated: true });
  }

  //Function that calculates the carousel page by given the selected date of the user
  function calculateCarouselPage(userSelectedDate) {
    let pageIndex = 0;
    let stepOfDates = firstWeekLength.current;
    let now = new Date();

    while (now < userSelectedDate) {
      now.setDate(now.getDate() + stepOfDates);
      pageIndex++;
      stepOfDates = 7;
    }

    pageIndex--;

    if (pageIndex !== carouselPageRef.current) {
      carouselPageRef.current = pageIndex;
      goToPage(pageIndex);
    }
  }

  const styles = StyleSheet.create({
    mainDiv: {
      display: "flex",
      gap: 10,
    },
    currentMonthHeader: {
      fontSize: 18,
      color: theme.text,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.currentMonthHeader}>{currentMonth}</Text>
      <Carousel
        ref={carouselRef}
        loop
        width={screenWidth}
        height={90}
        autoPlay={false}
        data={weeksGroups.current}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <DayOfWeek
            daysFromWeek={item}
            theme={theme}
            selectedDate={selectedDate}
            pageNumber={index}
            dateSelectionHandler={dateSelectionHandler}
            firstWeekLength={firstWeekLength.current}
          />
        )}
      />
    </View>
  );
}
