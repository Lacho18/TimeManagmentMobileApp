import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";
import TimeSelector from "../NewTaskComponents/TimeSelector";
import { getDateFromStartTime } from "../../functions/panicButtonHandler";
import { useUser } from "../../context/UserContext";

export default function DayStartTime({
  theme,
  userCurrentStartTime,
  userId,
  closeWindow,
}) {
  const { changeUserPreferences } = useUser();
  const [currentStartTime, setCurrentStartTime] =
    useState(userCurrentStartTime);
  const [timeSetter, setTimeSetter] = useState(false);

  function timeSelectionHandler(dateType, selectedTime) {
    setCurrentStartTime(
      `${String(selectedTime.getHours()).padStart(2, "0")}:${String(
        selectedTime.getMinutes()
      ).padStart(2, "0")}`
    );
    setTimeSetter(false);
  }

  function updateUserStartTime() {
    try {
      const docRef = doc(db, "Users", userId);

      updateDoc(docRef, { "preferences.dayStartTime": currentStartTime });
    } catch (error) {
      console.error(error.message);
    }

    changeUserPreferences("dayStartTime", currentStartTime);

    closeWindow();
  }

  const styles = StyleSheet.create({
    overflow: {
      width: "100%",
      height: "100%",
      backgroundColor: "transparent",
      position: "absolute",
      top: 0,
      zIndex: 100,
    },
    mainDiv: {
      width: "90%",
      height: 300,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.primary,
      borderWidth: 10,
      borderColor: theme.accent,
      borderRadius: 18,
      padding: 10,
      paddingHorizontal: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainText: {
      fontSize: 18,
      color: theme.text,
      textAlign: "center",
    },
    submitButton: {
      width: 120,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: theme.accent,
      borderRadius: 18,
      backgroundColor: theme.background,
    },

    layout: {
      display: "flex",
      alignItems: "center",
      gap: 15,
    },
    buttonsLayout: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 15,
    },
  });

  return (
    <View style={styles.overflow}>
      <View style={styles.mainDiv}>
        <Text style={styles.mainText}>
          Here you can define the start time of your day
        </Text>
        <Text style={styles.mainText}>
          Be cautious because task between your start time and 8 hours before
          this will not be allowed to be made
        </Text>
        <View style={styles.layout}>
          <Text style={styles.mainText}>
            Current value:{" "}
            <Text style={{ fontWeight: "bold" }}>{currentStartTime}</Text>
          </Text>
          <View style={styles.buttonsLayout}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setTimeSetter(true)}
            >
              <Text style={styles.mainText}>Change start time</Text>
            </TouchableOpacity>

            {currentStartTime !== userCurrentStartTime && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={updateUserStartTime}
              >
                <Text style={styles.mainText}>Set new time</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {timeSetter && (
        <TimeSelector
          theme={theme}
          dateType="startTime"
          currentSelectionOfDate={getDateFromStartTime(userCurrentStartTime)}
          onTimeSelect={timeSelectionHandler}
        />
      )}
    </View>
  );
}
