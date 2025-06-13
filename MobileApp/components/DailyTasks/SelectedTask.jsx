import { useEffect, useRef, useMemo, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { formatDateMonthName } from "../../utils/dateUtil";

import { STRESS_LEVELS } from "../../constants/StressLevel";
import { TASK_PRIORITIES } from "../../constants/TaskPriority";

import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMyFont } from "../../context/FontContext";

export default function SelectedTask({ selectedTask, theme, hideTask }) {
  const { font } = useMyFont();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const stressDescription = STRESS_LEVELS.find(
    (indexValue) => indexValue.stressValue === selectedTask.stressLevel
  );
  const priorityDescription = TASK_PRIORITIES.find(
    (indexValue) => indexValue.priorityValue === selectedTask.priority
  );

  const handleSheetChanges = (index) => {
    console.log("Sheet moved to index:", index);

    if (index === -1) {
      console.log("Sheet closed!");
      setIsModalVisible(false);
      hideTask();
    }
  };

  useEffect(() => {
    if (selectedTask) {
      setIsModalVisible(true);
    }
  }, [selectedTask]);

  const styles = StyleSheet.create({
    contentContainer: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 15,
      padding: 15,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: theme.text,
      fontFamily: font.bold,
    },
    description: {
      fontSize: 18,
      fontWeight: 200,
      color: theme.text,
      fontFamily: font.regular,
    },
    dateText: {
      fontSize: 18,
      fontWeight: 200,
      color: theme.text,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      fontFamily: font.regular,
    },
    durationDiv: {
      display: "flex",
      alignItems: "flex-start",
      gap: 5,
      width: "100%",
    },
    durationText: {
      color: theme.background,
      fontSize: 15,
      alignSelf: "flex-end",
      fontFamily: font.regular,
    },
    lineDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    circle: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      backgroundColor: selectedTask.durationColor,
    },
    line: {
      width: "90%",
      height: 3,
      backgroundColor: selectedTask.durationColor,
    },
    stressCircle: {
      width: 25,
      height: 25,
      borderRadius: "50%",
      backgroundColor: stressDescription.backgroundColor,
      borderWidth: 3,
      borderColor: stressDescription.lightColor,
    },
    breathingButton: {
      padding: 10,
      borderRadius: 18,
      backgroundColor: theme.accent,
    },
    breathingButtonText: {
      fontSize: 18,
      color: theme.background,
      fontWeight: 500,
      fontFamily: font.regular,
    },

    delayedText: {
      fontSize: 18,
      color: theme.text,
      position: "absolute",
      right: 10,
      top: 10,
      fontFamily: font.regular,
    },
  });

  if (!isModalVisible) return null;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
        hideTask();
      }}
    >
      <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
        <BottomSheetModalProvider>
          <View style={{ flex: 1, zIndex: 9999 }}>
            <BottomSheet
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              enablePanDownToClose={true}
              backgroundStyle={{ backgroundColor: theme.primary }}
              handleIndicatorStyle={{
                backgroundColor: theme.secondary,
                width: 75,
              }}
            >
              <BottomSheetView style={styles.contentContainer}>
                {selectedTask.delayed.isDelayed && (
                  <Text style={styles.delayedText}>delayed</Text>
                )}
                <Text style={styles.title}>{selectedTask.title}</Text>
                {selectedTask.description !== "" && (
                  <Text style={styles.description}>
                    {selectedTask.description}
                  </Text>
                )}
                {selectedTask.repeating.isRepeating ? (
                  <Text style={styles.dateText}>
                    <AntDesign name="calendar" size={24} color="red" />
                    <Text>
                      Every day from {selectedTask.repeating.repeatStartTime}{" "}
                      {selectedTask.repeating.repeatEndTime !== "" &&
                        "to " + selectedTask.repeating.repeatEndTime}
                    </Text>
                  </Text>
                ) : selectedTask.endTime ? (
                  <Text style={styles.dateText}>
                    <AntDesign name="calendar" size={24} color="red" />
                    <Text>
                      {formatDateMonthName(selectedTask.startTime)} -{" "}
                      {formatDateMonthName(selectedTask.endTime)}
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.dateText}>
                    <AntDesign name="calendar" size={24} color="red" />
                    {formatDateMonthName(selectedTask.startTime)}
                  </Text>
                )}

                {selectedTask.endTime && (
                  <View style={styles.durationDiv}>
                    <Text style={styles.dateText}>
                      <Octicons name="hourglass" size={28} color="yellow" />
                      <Text style={{ fontSize: 20, fontWeight: 300 }}>
                        Duration
                      </Text>
                    </Text>
                    <Text style={styles.durationText}>
                      {selectedTask.duration}
                    </Text>
                    <View style={styles.lineDiv}>
                      <View style={styles.circle}></View>
                      <View style={styles.line}></View>
                      <View style={styles.circle}></View>
                    </View>
                  </View>
                )}
                <View
                  style={{
                    ...styles.lineDiv,
                    gap: 20,
                    marginTop: 20,
                    justifyContent: "flex-start",
                  }}
                >
                  <Text style={styles.dateText}>
                    You are feeling
                    <Text
                      style={{
                        color: stressDescription.lightColor,
                        fontWeight: "bold",
                        textShadowColor: "black",
                        textShadowOffset: { width: 1, height: 1 },
                        textShadowRadius: 1,
                      }}
                    >
                      {stressDescription.textDescription}
                    </Text>{" "}
                    about this task
                  </Text>
                  <View style={styles.stressCircle}></View>
                </View>
                {selectedTask.stressLevel > 3 && (
                  <View style={styles.lineDiv}>
                    <TouchableOpacity style={styles.breathingButton}>
                      <Text style={styles.breathingButtonText}>
                        Perform breathing exercise
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.dateText}>
                  <Ionicons
                    name="flag"
                    size={24}
                    color={priorityDescription.backgroundColor}
                  />{" "}
                  Priority - {priorityDescription.textDescription}
                </Text>
                {selectedTask.location !== "" && (
                  <Text style={styles.dateText}>
                    <FontAwesome6
                      name="location-dot"
                      size={24}
                      color={theme.accent}
                    />
                    Location - {selectedTask.location}
                  </Text>
                )}
              </BottomSheetView>
            </BottomSheet>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Modal>
  );
}
