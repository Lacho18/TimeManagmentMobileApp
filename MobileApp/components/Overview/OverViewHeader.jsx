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

export default function OverViewHeader({ theme }) {
  const dateRef = useRef(new Date());
  const weeksGroups = useRef(getGroupWeeksData());
  const [currentMonth, setCurrentMonth] = useState();

  useEffect(() => {
    setCurrentMonth(
      `${MONTHS[dateRef.current.getMonth()]} ${dateRef.current.getFullYear()}`
    );
  }, [dateRef.current]);

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

  console.log(weeksGroups.current);

  const styles = StyleSheet.create({
    mainDiv: {
      display: "flex",
      gap: 10,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>{currentMonth}</Text>
      <Carousel
        loop
        width={screenWidth}
        height={90}
        autoPlay={false}
        data={weeksGroups.current}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <DayOfWeek daysFromWeek={item} theme={theme} />
        )}
      />
    </View>
  );
}
