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

export default function MaxTasks({
  theme,
  font,
  userCurrentMaxTasks,
  userId,
  closeWindow,
}) {
  const { changeUserPreferences } = useUser();
  const [currentMaxTasks, setCurrentMaxTasks] = useState(
    userCurrentMaxTasks ? Number(userCurrentMaxTasks) : 1
  );

  function updateUserMaxTasks() {
    try {
      const docRef = doc(db, "Users", userId);

      updateDoc(docRef, {
        "preferences.maxNumberOfTasks": currentMaxTasks,
      });
    } catch (error) {
      console.error(error.message);
    }

    changeUserPreferences("maxNumberOfTasks", currentMaxTasks);

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
        The big number of tasks can be stressful. Here you can manage the max
        number of daily tasks
      </Text>
      <Slider
        style={{ width: "100%", height: 40 }}
        minimumValue={1}
        maximumValue={30}
        step={1}
        value={currentMaxTasks}
        onValueChange={setCurrentMaxTasks}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.background}
        thumbTintColor={theme.secondary}
      />
      <Text style={styles.mainText}>
        Current value:{" "}
        <Text style={{ fontWeight: "bold", fontFamily: font.bold }}>
          {currentMaxTasks}
        </Text>
      </Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={updateUserMaxTasks}
      >
        <Text style={styles.mainText}>Set new time</Text>
      </TouchableOpacity>
    </Pressable>
  );
}
