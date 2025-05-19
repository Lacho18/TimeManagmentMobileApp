import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";
import { useUser } from "../../context/UserContext";

export default function MinRestTime({
  theme,
  currentMinTime,
  userId,
  closeWindow,
}) {
  const { changeUserPreferences } = useUser();
  const [minutes, setMinutes] = useState(currentMinTime / 60 / 1000);

  console.log(userId);

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
        "preferences.min_rest_time_between_tasks":
          millisecondsMinRestTime.toString(),
      });
    } catch (error) {
      console.error(error.message);
    }

    closeWindow();
  }

  const styles = StyleSheet.create({
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
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.mainText}>
        This is time that is automatically added between tasks
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={0}
        maximumValue={360}
        step={1}
        value={minutes}
        onValueChange={setMinutes}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.highlight}
        thumbTintColor={theme.secondary}
      />
      <Text style={styles.mainText}>
        Current time:{" "}
        <Text style={{ fontWeight: "bold" }}>{calculateHours()}</Text>
      </Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={updateUserMinRestTime}
      >
        <Text style={styles.mainText}>Set new time</Text>
      </TouchableOpacity>
    </View>
  );
}
