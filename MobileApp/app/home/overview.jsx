import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  InteractionManager,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import OverViewHeader from "../../components/Overview/OverViewHeader";
import { useEffect, useRef, useState } from "react";
import { DAYS_AHEAD_OVERVIEW_VIEW } from "../../constants/DateConstants";
import { getGivenNumberOfDays } from "../../utils/dateUtil";
import DayOverviewView from "../../components/Overview/DayOverviewView";
import { deleteTask, getTaskForGivenDay } from "../../database/taskController";
import { DUMMY_DATA_TASKS } from "../../constants/dummyData";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectedTask from "../../components/DailyTasks/SelectedTask";
import { useMyFont } from "../../context/FontContext";
import { useUser } from "../../context/UserContext";

export default function Overview() {
  const { theme } = useTheme();
  const { font } = useMyFont();
  const { user } = useUser();

  //Ref about array of dates ahead of today which will be accessible from overview page component
  const daysAhead = useRef(getGivenNumberOfDays(DAYS_AHEAD_OVERVIEW_VIEW));

  //Follows the selected date from the user
  const [selectedDate, setSelectedDate] = useState(new Date());

  //Reference to the scroll view. It is used because when the user click on some date this date to go to the top of the screen
  const scrollViewRef = useRef(null);

  //Reference to every item inside the scroll view
  const itemsRef = useRef({});

  //State for selected tasks from the selected date
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);

  const [userSelectionTask, setUserSelectionTask] = useState(null);

  useEffect(() => {
    async function getTodayTasks() {
      const result = await getTaskForGivenDay(new Date(), user.id);

      if (result.length > 0) {
        setSelectedDayTasks(result);
      }
    }

    getTodayTasks();
  }, []);

  //From the selected date by the user finds every task on this date and returns it as an array. If none returns empty array
  async function getSelectedTasks(date, index) {
    //After completing development remove the Dummy data and return fetch function
    const fetchedData = await getTaskForGivenDay(date, user.id);
    //const fetchedData = DUMMY_DATA_TASKS;

    //Sets the state for the selected date
    setSelectedDate(date);

    //Position the selected day on the top of the scroll view
    handleScrollViewLayout(index);

    //Sets the array of task with the selected one
    setSelectedDayTasks(fetchedData);
  }

  //Function that send the clicked attribute from the scroll view to the top of the scroll view
  function handleScrollViewLayout(key) {
    const COMPONENT_FIXED_HEIGHT = 60;
    InteractionManager.runAfterInteractions(() => {
      if (itemsRef.current[key] && scrollViewRef.current) {
        itemsRef.current[key].measureLayout(
          scrollViewRef.current,
          (x, y) => {
            scrollViewRef.current.scrollTo({
              y: COMPONENT_FIXED_HEIGHT * key,
              animated: true,
            });
          },
          (error) => console.error(error)
        );
      }
    });
  }

  async function completeTaskHandlerOverview(taskId) {
    let completedTask;
    //Remove the task from the state
    setSelectedDayTasks((allTasks) => {
      const allTasksCopy = [...allTasks];
      const selectedTaskIndex = allTasksCopy.findIndex(
        (task) => task.id === taskId
      );

      completedTask = allTasksCopy.splice(selectedTaskIndex, 1)[0];
      return allTasksCopy;
    });

    //Sets the task as completed
    completedTask.completed = true;

    console.log(completedTask);

    //Deletes and creates log for completed task
    await deleteTask(completedTask, user.id);
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 10,
      gap: 15,
      marginBottom: -35,
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
      fontFamily: font.bold,
    },
  });

  return (
    <>
      <SafeAreaView style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Upcoming</Text>

          <OverViewHeader
            theme={theme}
            selectedDate={selectedDate}
            dateSelectionHandler={getSelectedTasks}
          />
        </View>
        <ScrollView
          ref={scrollViewRef}
          vertical
          contentContainerStyle={{
            gap: 15,
            paddingBottom: 20,
          }}
          style={{ zIndex: 30, position: "relative" }}
          keyboardShouldPersistTaps="handled"
          scrollEnabled
          nestedScrollEnabled
        >
          {daysAhead.current.map((date, index) => (
            <DayOverviewView
              key={index}
              index={index}
              font={font}
              itemsRef={itemsRef}
              date={date}
              theme={theme}
              isToday={false}
              selectedDate={selectedDate}
              selectedTasks={selectedDayTasks}
              dateSelectionHandler={getSelectedTasks}
              taskSelectionHandler={(task) => setUserSelectionTask(task)}
              onCompletedTask={completeTaskHandlerOverview}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      {userSelectionTask && (
        <SelectedTask
          selectedTask={userSelectionTask}
          theme={theme}
          hideTask={() => setUserSelectionTask(null)}
        />
      )}
    </>
  );
}
