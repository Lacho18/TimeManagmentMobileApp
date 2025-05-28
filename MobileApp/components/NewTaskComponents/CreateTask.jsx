import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  TextInput,
  ScrollView,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useTheme } from "../../context/ThemeContext";
import TaskModel from "../../models/TaskModel";
import PrioritySelect from "./PrioritySelect";
import StressLevelSelect from "./StressLevelSelect";
import DateSelection from "./DateSelection";
import TimeSelector from "./TimeSelector";
import TaskDate from "./TaskDate";
import { dateValidation } from "../../functions/dateValidation";
import { createTask } from "../../database/taskController";
import TaskLocation from "./TaskLocation";
import { useUser } from "../../context/UserContext";

import CheckBox from "expo-checkbox";
import { router } from "expo-router";
import { useQuestion } from "../../context/QuestionContext";
import QuestionComponent from "../QuestionComponent";
import { subQuarters } from "date-fns";
import { useWarning } from "../../context/WarningContext";

const screenHeight = Dimensions.get("window").height;

/*
  MANIFEST SERIAL
*/

export default function CreateTask({ closeAddTaskMenu, visible }) {
  const { valWarningMessage } = useWarning();
  const { theme } = useTheme();

  //Used only on create task function in order to know the user time between tasks
  const { user } = useUser();

  const [newTask, setNewTask] = useState({ ...TaskModel });

  //Follows whether to show or not the select date component
  const [dateSelection, setDateSelection] = useState(false);

  //Follows whether to show or not the select location component
  const [locationSelection, setLocationSelection] = useState(false);

  //isSelecting follows whether the menu for time selection is visible. dateType is used to know whether the time is selected for startTime or endTime
  const [timeSelection, setTimeSelection] = useState({
    isSelecting: false,
    dateType: "",
  });
  //Possible values: 0 - nothing is seen; 1 - shows question that asks for setting duration of the task; 2 - shows date selection for the duration
  const [isThereDuration, setIsThereDuration] = useState(0);

  //State for visualizing errors
  const [error, setError] = useState("");

  const translateY = useRef(new Animated.Value(screenHeight)).current;

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
      setIsThereDuration(1);
      console.log("A question for that asks for setting duration of the task");
    }

    //After time is set hide the window that sets it
    if (timeSelection.isSelecting) {
      setTimeSelection({ isSelecting: false, dateType: "" });
    }

    setTimeout(() => {
      if (dateType === "startTime") {
        setError(dateValidation(dateWithTime, newTask.endTime));
      } else if (dateType === "endTime") {
        setError(dateValidation(newTask.startTime, dateWithTime));
      } else {
        setError(dateValidation(newTask.startTime, newTask.endTime));
      }
    }, 1000);
  }

  //Function that handle task creation
  async function createTaskHandler() {
    const result = await createTask(newTask, user);

    if (result === "Success") {
      closeAddTaskMenu();
      router.push("/home/dailyTasks");
    } else if (result.includes("The big numbers of tasks can")) {
      valWarningMessage(result);
      closeAddTaskMenu();
      router.push("/home/dailyTasks");
    } else setError(result);
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
      borderRadius: 10,
      zIndex: 100,
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
    buttonText: {
      fontSize: 18,
      color: theme.text,
    },
    questionDiv: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },

    questionAnswerDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: 100,
    },

    questionButtons: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 5,
    },

    errorMessage: {
      color: "#f7395c",
      fontSize: 20,
      fontWeight: "bold",
      width: 250,
      textAlign: "center",
    },

    taskLocationButton: {
      alignSelf: "center",
      padding: 10,
      borderWidth: 4,
      borderColor: theme.secondary,
      borderRadius: 18,
      backgroundColor: theme.highlight,
      marginTop: 20,
    },

    addTaskButton: {
      backgroundColor: theme.highlight,
      width: 120,
      height: 50,
      borderColor: theme.background,
      borderWidth: 4,
      padding: 10,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
      <ScrollView
        vertical
        contentContainerStyle={{ gap: 20 }}
        style={styles.panel}
      >
        <TouchableOpacity style={styles.closeButton} onPress={closeAddTaskMenu}>
          <Fontisto name="close-a" size={20} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Add new task</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Enter task name</Text>
          <TextInput
            placeholder="Name"
            style={styles.inputField}
            onChangeText={(value) => {
              setNewTaskField("title", value);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Enter task description</Text>
          <TextInput
            placeholder="Description"
            style={styles.inputField}
            onChangeText={(value) => {
              setNewTaskField("description", value);
            }}
          />
        </View>
        <TaskDate
          theme={theme}
          dateType={"startTime"}
          newTaskValue={newTask.startTime}
          openDateSelection={(dateType) => {
            setDateSelection(true);
            setTimeSelection((oldValue) => {
              return { ...oldValue, dateType: dateType };
            });
          }}
          setFeatureDate={featureDate}
          error={error}
        />
        {isThereDuration !== 0 &&
          (isThereDuration === 1 ? (
            <View style={styles.questionDiv}>
              <Text style={styles.labelText}>Set task duration?</Text>
              <View style={styles.questionAnswerDiv}>
                <TouchableOpacity
                  style={{
                    ...styles.questionButtons,
                    backgroundColor: "#1fff26",
                  }}
                  onPress={() => {
                    setIsThereDuration(2);
                  }}
                >
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.questionButtons,
                    backgroundColor: "#ff0000",
                  }}
                  onPress={() => {
                    setIsThereDuration(0);
                  }}
                >
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TaskDate
              theme={theme}
              dateType={"endTime"}
              newTaskValue={newTask.endTime}
              openDateSelection={(dateType) => {
                setDateSelection(true);
                setTimeSelection((oldValue) => {
                  return { ...oldValue, dateType: dateType };
                });
              }}
              setFeatureDate={featureDate}
              error={error}
            />
          ))}
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

        <TouchableOpacity
          style={styles.taskLocationButton}
          onPress={() => setLocationSelection((oldValue) => !oldValue)}
        >
          <Text style={{ color: theme.text, fontSize: 15 }}>
            {locationSelection ? "Clear" : "Select"} task location
          </Text>
        </TouchableOpacity>

        {locationSelection && (
          <TaskLocation
            theme={theme}
            locationSelectionHandler={(locatedValue) =>
              setNewTaskField("location", locatedValue)
            }
          />
        )}

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 18,
          }}
        >
          {
            <CheckBox
              value={newTask.repeating.isRepeating}
              onValueChange={() => {
                setNewTask((oldValue) => ({
                  ...oldValue,
                  repeating: {
                    ...oldValue.repeating,
                    isRepeating: !oldValue.repeating.isRepeating,
                  },
                }));
              }}
              tintColors={{ true: "#FF8C00", false: "gray" }}
            />
          }
          <Text style={styles.labelText}>
            Do you want the task to repeat every day
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 18,
            marginBottom: 100,
          }}
        >
          <TouchableOpacity
            style={styles.addTaskButton}
            onPress={createTaskHandler}
          >
            <Text style={styles.buttonText}>Add task</Text>
          </TouchableOpacity>
        </View>

        {error !== "" && <Text style={styles.errorMessage}>{error}</Text>}

        {/*Sub pages for the day*/}
        {dateSelection && (
          <DateSelection
            theme={theme}
            visible={dateSelection}
            dateType={timeSelection.dateType}
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
      </ScrollView>
    </Animated.View>
  );
}
