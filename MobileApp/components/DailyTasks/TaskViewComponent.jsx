import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Easing,
  Dimensions,
} from "react-native";
import { STRESS_LEVELS } from "../../constants/StressLevel";
import { TASK_PRIORITIES } from "../../constants/TaskPriority";
import {
  formatDateMonthName,
  millisecondsCalculator,
} from "../../utils/dateUtil";

import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRef, useState } from "react";
import { useQuestion } from "../../context/QuestionContext";

const screenWidth = Dimensions.get("window").width;
const ANIMATION_INTERVAL = 1500;

export default function TaskViewComponent({
  theme,
  task,
  selectTask,
  onCompleteTask,
}) {
  const { openQuestionMenu, formQuestionStructure } = useQuestion();
  const slideAnim = useRef(new Animated.Value(0)).current;

  const stressColors = STRESS_LEVELS.find(
    (indexValue) => indexValue.stressValue === task.stressLevel
  );
  const priorityColors = TASK_PRIORITIES.find(
    (indexValue) => indexValue.priorityValue === task.priority
  );

  const taskDuration = millisecondsCalculator(task.duration);

  //Starts the animation which is ANIMATION_INTERVAL milliseconds long
  const handlePress = () => {
    slideAnim.setValue(0);

    Animated.timing(slideAnim, {
      toValue: 1,
      duration: ANIMATION_INTERVAL,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const overlayTranslate = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenWidth, screenWidth], // slides across entire width
  });

  //The colors that describes the transition of the background on complete task
  const animatedBackgroundColor = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      stressColors.backgroundColor,
      stressColors.vividBackgroundColor,
    ],
  });

  const animatedBorder = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [stressColors.lightColor, stressColors.textColor],
  });

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

  function onCompleteTaskButtonPress() {
    //Starts animation for completing task
    handlePress();

    //After the animation end delete the task and mark it as complete
    setTimeout(() => {
      onCompleteTask(task.id);
    }, ANIMATION_INTERVAL);
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
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
      style={{ width: "95%" }}
      onPress={() => {
        selectTask(task);
      }}
    >
      <View style={{ position: "relative" }}>
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "95%",
            backgroundColor: animatedBackgroundColor,
            borderWidth: 2,
            borderColor: animatedBorder,
            borderRadius: 10,
            opacity: 0.5, // Faint highlight
            transform: [{ translateX: overlayTranslate }],
            zIndex: 1,
            borderRadius: 10,
          }}
        />

        <View style={[styles.mainDiv, { zIndex: 2 }]}>
          {task.delayed.isDelayed && (
            <Text style={styles.delayedText}>delayed</Text>
          )}
          <TouchableOpacity
            style={styles.completeTaskButton}
            onPress={onCompleteTaskButtonPress}
          ></TouchableOpacity>
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
          <TouchableOpacity
            style={styles.delayButton}
            onPress={delayButtonHandler}
          >
            <AntDesign name="stepforward" size={28} color={theme.secondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
