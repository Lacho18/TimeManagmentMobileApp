import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import { useEffect, useRef, useState } from "react";
import {
  delayTask,
  deleteTask,
  getTaskForGivenDay,
} from "../../database/taskController";
import TaskViewComponent from "../../components/DailyTasks/TaskViewComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectedTask from "../../components/DailyTasks/SelectedTask";

import Entypo from "@expo/vector-icons/Entypo";
import MenuOptions from "../../components/DailyTasks/MenuOptions";
import { useQuestion } from "../../context/QuestionContext";
import QuestionComponent from "../../components/QuestionComponent";
import CalmingVideo from "../../components/DailyTasks/CalmingVideo";
import { useMyFont } from "../../context/FontContext";
import { useWarning } from "../../context/WarningContext";
import WarningComponent from "../../components/WarningComponent";
import DailyTasksSimpleView from "../../components/DailyTasks/DailyTasksSimpleView";
import StressLevelSelector from "../../components/StressLevelSelector";

export default function DailyTasks() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  const { theme, toggleTheme } = useTheme();
  if (!theme) {
    toggleTheme("purple");
    return;
  }

  const {
    isQuestionActive,
    questionData,
    closeQuestionMenu,
    openQuestionMenu,
    formQuestionStructure,
  } = useQuestion();
  const { font } = useMyFont();
  const { warningMessage, valWarningMessage, clearWarning } = useWarning();

  //All tasks for the current date
  const [allDailyTasks, setAllDailyTasks] = useState([]);

  //Object for the selected task used in SelectedTask component
  const [selectedTask, setSelectedTask] = useState(null);

  //Reference to the button that visualize the menu
  const menuButtonRef = useRef(null);

  //Position for the menu component. Dynamically positioned based on the device width and height
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  //Follows whether the menu is visible or not
  const [showMenu, setShowMenu] = useState(false);

  //Follows whether to visualize calming video before stressful task
  const [activateCalmingVideo, setActivateCalmingVideo] = useState(false);

  //Follows whether to visualize stress level selector
  const [stressLevelSelector, setStressLevelSelector] = useState(false);

  //Describes the last selected filter in order to reverse if the same filter is selected second time
  const lastSelectedFilter = useRef({
    type: "startTime",
    sorting: "ascending",
  });

  useEffect(() => {
    async function getTodayTasks() {
      const result = await getTaskForGivenDay(new Date(), user.id);

      if (result.length > 0) {
        setAllDailyTasks(result);
      }
    }

    getTodayTasks();
    checkForCloseStressfulTask();
  }, []);

  //Calculates the position of the button so the menu component to display on the right position on every device
  function menuButtonHandler() {
    menuButtonRef.current.measure((fx, fy, width, height, px, py) => {
      setMenuPosition({ top: py + height, left: px + width });
      setShowMenu((oldValue) => !oldValue);
    });
  }

  //Closes all the open menus by clicking anywhere on the page
  function closeMenusHandler() {
    if (selectedTask) {
      setSelectedTask(null);
    }

    if (showMenu) {
      setShowMenu(false);
    }

    if (isQuestionActive) {
      closeQuestionMenu();
    }

    if (activateCalmingVideo) {
      setActivateCalmingVideo(false);
    }

    if (stressLevelSelector) {
      setStressLevelSelector(false);
    }
  }

  //Function that is called on menu button click
  function sortingTasksHandler(sortingType) {
    //Checking if the last filter is the same. If so change the ascending method to descending
    if (lastSelectedFilter.current.type === sortingType) {
      lastSelectedFilter.current.sorting =
        lastSelectedFilter.current.sorting === "ascending"
          ? "descending"
          : "ascending";
    } else {
      //Setting the last selected sorting type
      lastSelectedFilter.current.type = sortingType;
      lastSelectedFilter.current.sorting = "ascending";
    }

    //Sort the today tasks array
    taskSorter(sortingType, lastSelectedFilter.current.sorting);
    //Closes the menu
    setShowMenu(false);
  }

  //Function that make filters by given field from the task object
  function taskSorter(sortingField, sortBy) {
    let todayTasks = allDailyTasks;
    if (sortBy === "ascending") {
      todayTasks = todayTasks.sort((a, b) => a[sortingField] - b[sortingField]);
    } else {
      todayTasks = todayTasks.sort((a, b) => b[sortingField] - a[sortingField]);
    }

    setAllDailyTasks(todayTasks);
  }

  function completeTaskHandler(taskId) {
    let completedTask;

    //Remove the task from the state
    setAllDailyTasks((allTasks) => {
      const allTasksCopy = [...allTasks];
      const selectedTaskIndex = allTasksCopy.findIndex(
        (task) => task.id === taskId
      );

      completedTask = allTasksCopy.splice(selectedTaskIndex, 1)[0];
      return allTasksCopy;
    });

    //Sets the task as completed
    completedTask.completed = true;

    //Deletes and creates log for completed task
    deleteTask(completedTask, user.id);
  }

  //Checks if the closest task is stressful in order to ask the user if he wants to see a calming video
  function checkForCloseStressfulTask() {
    //Forms the question data
    formQuestionStructure({
      question:
        "A stressful task is coming. Would you like to see a calming video?",
      subQuestionData: "",
      id: null,
    });

    //Opens question menu
    openQuestionMenu();
    //Current time
    const now = new Date();
    //Filters the today dates to just the one that has not passed
    const featureTasks = allDailyTasks.filter((task) => now < task.startTime);

    if (featureTasks.length == 0) {
      return;
    }

    //Finds the closest task on the feature
    const closestFeatureTask = featureTasks.reduce((previous, current) => {
      return current - now < previous - now ? curr : previous;
    });

    //Sets time 15 minutes ahead
    const nowAfterMinutes = now.setMinutes(now.getMinutes() + 15);

    //Checks if the closest task is in 15 minutes
    if (nowAfterMinutes > closestFeatureTask) {
      //Checks if the closest task is with high stress level
      if (
        closestFeatureTask.stressLevel == 4 ||
        closestFeatureTask.stressLevel == 5
      ) {
        //Forms the question data
        formQuestionStructure({
          question:
            "A stressful task is coming. Would you like to see a calming video?",
          subQuestionData: "",
          id: null,
        });

        //Opens question menu
        openQuestionMenu();
      }
    }
  }

  //This function handles yes answer on 2 cases: delaying task and opening calming video
  async function yesQuestionHandler(tasksId) {
    //In case the task is delayed
    if (questionData.id) {
      delayTask(tasksId, user);
    } else {
      setActivateCalmingVideo(true);
    }
    closeQuestionMenu();
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 10,
      position: "relative",
    },

    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },

    title: {
      fontSize: 30,
      color: theme.text,
      fontFamily: font.bold,
    },

    subTitle: {
      fontSize: 18,
      color: theme.text,
      fontFamily: font.regular,
    },

    tasksDiv: {
      width: "100%",
    },

    tasksContainerStyle: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 20,
    },

    noTasksDiv: { flex: 1, justifyContent: "center", alignItems: "center" },
    noTasksDivText: {
      fontSize: 24,
      color: theme.text,
      fontFamily: font.regular,
    },
    hint: {
      fontSize: 15,
      color: theme.text,
      fontStyle: "italic",
    },
  });

  return (
    <SafeAreaView style={styles.page}>
      <Pressable style={{ flex: 1, gap: 15 }} onPress={closeMenusHandler}>
        {showMenu && (
          <MenuOptions
            theme={theme}
            topPosition={menuPosition.top}
            leftPosition={menuPosition.left}
            lastSelectedFilter={lastSelectedFilter.current}
            sortingTasksHandler={sortingTasksHandler}
            userSimpleView={user.preferences.simpleView}
            openStressLevelSelector={() => {
              setStressLevelSelector(true);
              setShowMenu(false);
            }}
          />
        )}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Today</Text>
            <Text style={styles.subTitle}>{allDailyTasks.length} tasks</Text>
          </View>
          <TouchableOpacity
            ref={menuButtonRef}
            onPress={() => {
              menuButtonHandler();
            }}
          >
            <Entypo name="dots-three-vertical" size={24} color={theme.text} />
          </TouchableOpacity>
        </View>
        {allDailyTasks.length == 0 ? (
          <View style={styles.noTasksDiv}>
            <Text style={styles.noTasksDivText}>No tasks for today so far</Text>
          </View>
        ) : user.preferences.simpleView ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.hint}>
              Hold the task in order to complete it
            </Text>
            <DailyTasksSimpleView
              theme={theme}
              font={font}
              allDailyTasks={allDailyTasks}
              selectTask={(selection) => {
                setSelectedTask(selection);
              }}
              onCompleteTask={completeTaskHandler}
            />
          </View>
        ) : (
          <ScrollView
            vertical
            style={styles.tasksDiv}
            contentContainerStyle={styles.tasksContainerStyle}
          >
            {allDailyTasks.map((task) => (
              <TaskViewComponent
                key={task.id}
                font={font}
                theme={theme}
                task={task}
                selectTask={(selection) => {
                  setSelectedTask(selection);
                }}
                onCompleteTask={completeTaskHandler}
              />
            ))}
          </ScrollView>
        )}

        {selectedTask && (
          <SelectedTask
            selectedTask={selectedTask}
            theme={theme}
            hideTask={() => {
              setSelectedTask(null);
            }}
          />
        )}

        {isQuestionActive && (
          <QuestionComponent
            theme={theme}
            questionData={questionData}
            onYesAnswer={async (tasksId) => {
              await yesQuestionHandler(tasksId);
            }}
            onNoAnswer={() => closeQuestionMenu()}
          />
        )}

        {activateCalmingVideo && <CalmingVideo theme={theme} />}
        {warningMessage !== "" && <WarningComponent theme={theme} />}
        {stressLevelSelector && (
          <StressLevelSelector theme={theme} font={font} userId={user.id} />
        )}
      </Pressable>
    </SafeAreaView>
  );
}
