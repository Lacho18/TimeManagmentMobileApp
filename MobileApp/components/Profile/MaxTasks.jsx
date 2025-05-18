import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";

export default function MaxTasks({
  theme,
  userCurrentMaxTasks,
  userId,
  closeWindow,
}) {
  const [currentMaxTasks, setCurrentMaxTasks] = useState(
    userCurrentMaxTasks ? Number(userCurrentMaxTasks) : 1
  );

  function updateUUserMaxTasks() {
    try {
      const docRef = doc(db, "Users", userId);

      updateDoc(docRef, {
        "preferences.maxNumberOfTasks": currentMaxTasks,
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
        maximumTrackTintColor={theme.highlight}
        thumbTintColor={theme.secondary}
      />
      <Text style={styles.mainText}>
        Current value:{" "}
        <Text style={{ fontWeight: "bold" }}>{currentMaxTasks}</Text>
      </Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={updateUUserMaxTasks}
      >
        <Text style={styles.mainText}>Set new time</Text>
      </TouchableOpacity>
    </View>
  );
}
