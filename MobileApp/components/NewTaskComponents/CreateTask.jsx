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
import OptionSelect from "./PrioritySelect";
import StressLevelSelect from "./StressLevelSelect";

const screenHeight = Dimensions.get("window").height;

export default function CreateTask({ closeAddTaskMenu, visible }) {
  const { theme } = useTheme();
  const [newTask, setNewTask] = useState({ ...TaskModel });
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : screenHeight,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  function setNewTaskField(field, value) {
    setNewTask((oldValue) => {
      return { ...oldValue, [field]: value };
    });
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
        <View>
          <Text style={styles.labelText}>Task date</Text>
          <View style={styles.dateButtonsDiv}>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>tomorrow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}>select date</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.labelText}>
            How important is the task for the day
          </Text>
          <View style={styles.dateButtonsDiv}>
            <OptionSelect
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
      </View>
    </Animated.View>
  );
}
