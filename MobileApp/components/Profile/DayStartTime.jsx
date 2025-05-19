import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";

export default function DayStartTime({
  theme,
  userCurrentStartTime,
  userId,
  closeWindow,
}) {
  const [currentStartTime, setCurrentStartTime] =
    useState(userCurrentStartTime);

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
        Here you can define the start time of your day
      </Text>
      <Text style={styles.mainText}>
        Be cautious because task between your start time and 8 hours before this
        will not be allowed to be made
      </Text>

      <Text style={styles.mainText}>
        Current value:{" "}
        <Text style={{ fontWeight: "bold" }}>{currentStartTime}</Text>
      </Text>
      <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
        <Text style={styles.mainText}>Set new time</Text>
      </TouchableOpacity>
    </View>
  );
}
