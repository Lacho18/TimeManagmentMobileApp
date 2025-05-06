import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import OverViewHeader from "../../components/Overview/OverViewHeader";
import { useRef, useState } from "react";
import { DAYS_AHEAD_OVERVIEW_VIEW } from "../../constants/DateConstants";
import { getGivenNumberOfDays } from "../../utils/dateUtil";
import DayOverviewView from "../../components/Overview/DayOverviewView";
import { getTaskForGivenDay } from "../../database/taskController";
import { DUMMY_DATA_TASKS } from "../../constants/dummyData";

export default function Overview() {
  const { theme } = useTheme();

  //Ref about array of dates ahead of today which will be accessible from overview page component
  const daysAhead = useRef(getGivenNumberOfDays(DAYS_AHEAD_OVERVIEW_VIEW));

  //Follows the selected date from the user
  //const selectedDate = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);

  //Reference to the scroll view. It is used because when the user click on some date this date to go to the top of the screen
  const scrollViewRef = useRef(null);

  const itemsRef = useRef({});

  //State for selected tasks from the selected date
  const [selectedDayTasks, setSelectedDayTasks] = useState(null);

  //From the selected date by the user finds every task on this date and returns it as an array. If none returns empty array
  async function getSelectedTasks(date, index) {
    //const fetchedData = await getTaskForGivenDay(date);
    const fetchedData = DUMMY_DATA_TASKS;

    //selectedDate.current = date;
    setSelectedDate(date);

    handleScrollViewLayout(index);

    setSelectedDayTasks(fetchedData);
  }

  //Function that send the clicked attribute from the scroll view to the top of the scroll view
  function handleScrollViewLayout(key) {
    itemsRef.current[key]?.measureLayout(
      scrollViewRef.current,
      (x, y) => {
        scrollViewRef.current.scrollTo({ y, animated: true });
      },
      (error) => console.error(error)
    );
  }

  console.log(daysAhead.current);

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 10,
      gap: 15,
      position: "relative",
    },

    header: {
      display: "flex",
      gap: 20,
      width: "100%",
    },

    title: {
      fontSize: 30,
      color: theme.text,
      fontWeight: "bold",
    },

    scrollView: {
      display: "flex",
      width: "100%",
    },
  });

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming</Text>

        <OverViewHeader theme={theme} />
      </View>
      <ScrollView
        ref={scrollViewRef}
        vertical
        contentContainerStyle={{ gap: 15 }}
        style={styles.scrollView}
      >
        {daysAhead.current.map((date, index) => (
          <DayOverviewView
            key={index}
            index={index}
            itemsRef={itemsRef}
            date={date}
            theme={theme}
            isToday={false}
            selectedDate={selectedDate}
            selectedTasks={selectedDayTasks}
            dateSelectionHandler={getSelectedTasks}
          />
        ))}
      </ScrollView>
    </View>
  );
}
