import Slider from "@react-native-community/slider";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";
import { useUser } from "../../context/UserContext";

export default function MinRestTime({
  theme,
  font,
  currentMinTime,
  userId,
  closeWindow,
}) {
  const { changeUserPreferences } = useUser();
  const [minutes, setMinutes] = useState(currentMinTime / 60 / 1000);

  function calculateHours() {
    let minutesCopy = minutes;
    let hoursCounter = 0;

    while (minutesCopy - 60 >= 0) {
      hoursCounter++;

      minutesCopy -= 60;
    }

    if (hoursCounter == 0) {
      return `${minutesCopy} minutes`;
    } else {
      return `${hoursCounter} hour${
        hoursCounter == 1 ? "" : "s"
      } and ${minutesCopy} minutes`;
    }
  }

  function updateUserMinRestTime() {
    const millisecondsMinRestTime = minutes * 60 * 1000;

    try {
      const docRef = doc(db, "Users", userId);

      updateDoc(docRef, {
        "preferences.min_rest_time_between_tasks": millisecondsMinRestTime,
      });
    } catch (error) {
      console.error(error.message);
    }

    changeUserPreferences(
      "min_rest_time_between_tasks",
      millisecondsMinRestTime.toString()
    );

    closeWindow();
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "90%",
      height: 325,
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.primary,
      borderWidth: 2,
      borderColor: theme.highlight,
      borderRadius: 18,
      padding: 10,
      paddingHorizontal: 20,
      paddingVertical: 20,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    mainText: {
      fontSize: 18,
      color: theme.text,
      textAlign: "center",
      fontFamily: font.regular,
    },
    submitButton: {
      width: 130,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.highlight,
      borderRadius: 12,
      backgroundColor: theme.background,
      padding: 5,
    },
  });

  return (
    <Pressable style={styles.mainDiv} onPress={() => {}}>
      <Text style={styles.mainText}>
        This is time that is automatically added between tasks
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={90}
        step={1}
        value={minutes}
        onValueChange={setMinutes}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.highlight}
        thumbTintColor={theme.secondary}
      />
      <Text style={styles.mainText}>
        Current time:{" "}
        <Text style={{ fontWeight: "bold", fontFamily: font.bold }}>
          {calculateHours()}
        </Text>
      </Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={updateUserMinRestTime}
      >
        <Text style={styles.mainText}>Set new time</Text>
      </TouchableOpacity>
    </Pressable>
  );
}
