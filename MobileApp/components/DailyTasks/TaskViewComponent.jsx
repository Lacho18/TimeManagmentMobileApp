import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { STRESS_LEVELS } from "../../constants/StressLevel";
import { TASK_PRIORITIES } from "../../constants/TaskPriority";
import {
  formatDateMonthName,
  millisecondsCalculator,
} from "../../utils/dateUtil";

import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useQuestion } from "../../context/QuestionContext";

export default function TaskViewComponent({ theme, task, selectTask }) {
  const { openQuestionMenu, formQuestionStructure } = useQuestion();

  const stressColors = STRESS_LEVELS.find(
    (indexValue) => indexValue.stressValue === task.stressLevel
  );
  const priorityColors = TASK_PRIORITIES.find(
    (indexValue) => indexValue.priorityValue === task.priority
  );

  const taskDuration = millisecondsCalculator(task.duration);

  //Shows question menu for delaying the task
  function delayButtonHandler() {
    //Sets the question data
    formQuestionStructure({
      question: "Do you want to delay task : ",
      subQuestionData: task.title,
      id: task.id,
    });

    //Opens the question menu
    openQuestionMenu();
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "95%",
      height: 100,
      backgroundColor: stressColors.backgroundColor,
      borderWidth: 2,
      borderColor: stressColors.lightColor,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 7,
      opacity: task.delayed.isDelayed ? 0.8 : 1,
      gap: 10,
    },

    completeTaskButton: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      backgroundColor: priorityColors.backgroundColor,
      borderWidth: 5,
      borderColor: priorityColors.lightColor,
    },

    title: {
      fontSize: 18,
      color: stressColors.textColor,
      fontWeight: 500,
    },

    dateText: {
      fontSize: 16,
      color: stressColors.textColor,
      fontWeight: 400,
    },

    delayedText: {
      fontSize: 15,
      color: theme.text,
      position: "absolute",
      right: 10,
      top: 5,
    },

    delayButton: {
      position: "absolute",
      right: 10,
    },
  });

  return (
    <TouchableOpacity
      style={styles.mainDiv}
      onPress={() => {
        selectTask(task);
      }}
    >
      {task.delayed.isDelayed && (
        <Text style={styles.delayedText}>delayed</Text>
      )}
      <TouchableOpacity style={styles.completeTaskButton}></TouchableOpacity>
      <View>
        <Text style={styles.title}>{task.title}</Text>
        {!task.endTime ? (
          <Text style={styles.dateText}>
            {formatDateMonthName(task.startTime)}
          </Text>
        ) : (
          <View>
            <Text style={styles.dateText}>
              {formatDateMonthName(task.startTime)} -{" "}
              {formatDateMonthName(task.endTime)}
            </Text>
            <Text style={styles.dateText}>
              <Octicons
                name="hourglass"
                size={16}
                color="yellow"
                style={{ marginRight: 5 }}
              />
              {taskDuration}
            </Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.delayButton} onPress={delayButtonHandler}>
        <AntDesign name="stepforward" size={28} color={theme.secondary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}
