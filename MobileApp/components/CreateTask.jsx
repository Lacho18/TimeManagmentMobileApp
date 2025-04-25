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
import { useTheme } from "../context/ThemeContext";
import TaskModel from "../models/TaskModel";

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
      color: theme.background,
      marginBottom: 10,
    },
    inputContainer: {
      display: "flex",
      gap: 10,
    },
    labelText: {
      color: theme.background,
      fontSize: 18,
      fontWeight: 500,
    },
    inputField: {
      padding: 10,
      borderWidth: 1,
      borderColor: theme.background,
      fontSize: 20,
      borderRadius: 19,
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
      </View>
    </Animated.View>
  );
}
