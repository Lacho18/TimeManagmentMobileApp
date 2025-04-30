import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useTheme } from "../../context/ThemeContext";
import TaskModel from "../../models/TaskModel";
import PrioritySelect from "./PrioritySelect";
import StressLevelSelect from "./StressLevelSelect";
import DateSelection from "./DateSelection";
import { formatDate } from "../../utils/dateUtil";
import TimeSelector from "./TimeSelector";
import TaskDate from "./TaskDate";

const screenHeight = Dimensions.get("window").height;

export default function CreateTask({ closeAddTaskMenu, visible }) {
  const { theme } = useTheme();
  const [newTask, setNewTask] = useState({ ...TaskModel });
  const [dateSelection, setDateSelection] = useState(false);
  const [timeSelection, setTimeSelection] = useState({
    isSelecting: false,
    dateType: "",
  });

  const translateY = useRef(new Animated.Value(screenHeight)).current;

  console.log(newTask);

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : screenHeight,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  //Function that changes a field of the new task
  function setNewTaskField(field, value) {
    //If the changed value is date immediately ask the user to select time. The field describes the date type (start or end)
    if (value instanceof Date) {
      setTimeSelection({ isSelecting: true, dateType: field });
    }

    setNewTask((oldValue) => {
      return { ...oldValue, [field]: value };
    });

    //If date is selected hide the menu for the selection of dates
    if (dateSelection) setDateSelection(false);
  }

  //Sets a date by given numbers of days ahead
  function featureDate(field, numberOfDays) {
    let now = new Date();
    let featureDate = new Date(now);
    featureDate.setDate(now.getDate() + numberOfDays);

    setNewTaskField(field, featureDate);
  }

  //Function that executes when user set time for the task
  function onTimeSet(dateType, dateWithTime) {
    //Sets the new field of the new task big object
    setNewTaskField(dateType, dateWithTime);

    //This happens after time set. At this point the date selection component should be hidden
    if (dateSelection) {
      setDateSelection(false);
    }

    //Adding functionality for duration. If this is true visualize a question that ask for setting a duration
    if (timeSelection.dateType === "startTime") {
      console.log("A question for that asks for setting duration of the task");
    }

    //After time is set hide the window that sets it
    if (timeSelection.isSelecting) {
      setTimeSelection({ isSelecting: false, dateType: "" });
    }
  }

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "90%",
      zIndex: 100,
    },
    panel: {
      flex: 1,
      backgroundColor: theme.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      display: "flex",
      padding: 20,
      justifyContent: "",
      gap: 20,
    },
    closeButton: {
      width: 40,
      height: 40,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 0,
      top: 0,
      borderTopRightRadius: 20,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: theme.text,
    },
    inputContainer: {
      display: "flex",
      gap: 10,
    },
    labelText: {
      color: theme.text,
      fontSize: 18,
      fontWeight: 500,
    },
    inputField: {
      padding: 10,
      borderWidth: 1,
      borderColor: theme.background,
      fontSize: 20,
      borderRadius: 19,
      color: theme.text,
    },
    dateButtonsDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      marginTop: 5,
    },
    buttonStyle: {
      borderWidth: 1,
      borderColor: theme.background,
      borderRadius: 7,
      width: 100,
      height: 40,
      backgroundColor: theme.secondary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
      color: "orange",
    },
    dateVisualText: {
      color: "red",
      fontSize: 18,
      textAlign: "center",
      margin: 10,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.panel}>
        <TouchableOpacity style={styles.closeButton} onPress={closeAddTaskMenu}>
          <Fontisto name="close-a" size={20} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Add new task</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Enter task name</Text>
          <TextInput placeholder="Name" style={styles.inputField} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Enter task description</Text>
          <TextInput placeholder="Description" style={styles.inputField} />
        </View>
        {/*<View>
          <Text style={styles.labelText}>Task date</Text>
          <View style={styles.dateButtonsDiv}>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setNewTaskField("startTime", new Date());
              }}
            >
              <Text style={styles.buttonText}>today</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                featureDate("startTime", 1);
              }}
            >
              <Text style={styles.buttonText}>tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setDateSelection(true);
              }}
            >
              <Text style={styles.buttonText}>select date</Text>
            </TouchableOpacity>
          </View>
          {newTask.startTime !== null && (
            <Text style={styles.dateVisualText}>
              Selected: {formatDate(newTask.startTime)}
            </Text>
          )}
        </View> */}
        <TaskDate
          theme={theme}
          dateType={"startTime"}
          newTaskValue={newTask.startTime}
          openDateSelection={() => {
            setDateSelection(true);
          }}
          setFeatureDate={featureDate}
        />
        <View>
          <Text style={styles.labelText}>
            How important is the task for the day
          </Text>
          <View style={styles.dateButtonsDiv}>
            <PrioritySelect
              selectedPriority={newTask.priority}
              changePriority={setNewTaskField}
            />
          </View>
        </View>
        <View>
          <Text style={styles.labelText}>How do you feel about this task</Text>
          <View style={styles.dateButtonsDiv}>
            <StressLevelSelect
              selectedStressLevel={newTask.stressLevel}
              changeStressLevel={setNewTaskField}
            />
          </View>
        </View>

        {dateSelection && (
          <DateSelection
            theme={theme}
            visible={dateSelection}
            dateType={"startTime"}
            closeButtonStyle={styles.closeButton}
            onDateSelect={setNewTaskField}
            onClose={() => {
              setDateSelection(false);
            }}
          />
        )}

        {timeSelection.isSelecting && (
          <TimeSelector
            theme={theme}
            dateType={timeSelection.dateType}
            currentSelectionOfDate={newTask[timeSelection.dateType]}
            onTimeSelect={onTimeSet}
          />
        )}
      </View>
    </Animated.View>
  );
}
