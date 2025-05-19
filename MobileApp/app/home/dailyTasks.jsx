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
import { delayTask, getTaskForGivenDay } from "../../database/taskController";
import TaskViewComponent from "../../components/DailyTasks/TaskViewComponent";
import SelectedTask from "../../components/DailyTasks/SelectedTask";

import { DUMMY_DATA_TASKS } from "../../constants/dummyData";

import Entypo from "@expo/vector-icons/Entypo";
import MenuOptions from "../../components/DailyTasks/MenuOptions";
import { useQuestion } from "../../context/QuestionContext";
import QuestionComponent from "../../components/QuestionComponent";

export default function DailyTasks() {
  const { theme } = useTheme();
  const { loading } = useUser();
  const { user } = useUser();
  const { isQuestionActive, questionData, closeQuestionMenu } = useQuestion();

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

  //Describes the last selected filter in order to reverse if the same filter is selected second time
  const lastSelectedFilter = useRef({
    type: "startTime",
    sorting: "ascending",
  });

  useEffect(() => {
    async function getTodayTasks() {
      //RETURN AFTER FINISHING THE APP
      //const result = await getTaskForGivenDay(new Date());

      const result = DUMMY_DATA_TASKS;

      if (result.length > 0) {
        setAllDailyTasks(result);
      }
    }

    getTodayTasks();
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
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },

    title: {
      fontSize: 30,
      color: theme.text,
      fontWeight: "bold",
    },

    subTitle: {
      fontSize: 18,
      color: theme.text,
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
  });

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Pressable style={styles.page} onPress={closeMenusHandler}>
      {showMenu && (
        <MenuOptions
          theme={theme}
          topPosition={menuPosition.top}
          leftPosition={menuPosition.left}
          lastSelectedFilter={lastSelectedFilter.current}
          sortingTasksHandler={sortingTasksHandler}
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
      <ScrollView
        vertical
        style={styles.tasksDiv}
        contentContainerStyle={styles.tasksContainerStyle}
      >
        {allDailyTasks.map((task) => (
          <TaskViewComponent
            key={task.id}
            theme={theme}
            task={task}
            selectTask={(selection) => {
              setSelectedTask(selection);
            }}
          />
        ))}
      </ScrollView>

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
            await delayTask(tasksId, user);
            closeQuestionMenu();
          }}
          onNoAnswer={() => closeQuestionMenu()}
        />
      )}
    </Pressable>
  );
}
