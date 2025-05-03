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
import { getTaskForGivenDay } from "../../database/taskController";
import TaskViewComponent from "../../components/DailyTasks/TaskViewComponent";
import SelectedTask from "../../components/DailyTasks/SelectedTask";

import { DUMMY_DATA_TASKS } from "../../constants/dummyData";

import Entypo from "@expo/vector-icons/Entypo";
import MenuOptions from "../../components/DailyTasks/MenuOptions";

export default function DailyTasks() {
  const { theme } = useTheme();
  const { loading } = useUser();
  const [allDailyTasks, setAllDailyTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const menuButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    async function getTodayTasks() {
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
  }

  function sortingTasksHandler(sortingType) {
    console.log(sortingType);
    setShowMenu(false);
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
    </Pressable>
  );
}
