import Slider from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function MinRestTime({ theme, currentMinTime }) {
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
        minimumValue={1}
        maximumValue={360}
        step={1}
        value={minutes}
        onValueChange={setMinutes}
        minimumTrackTintColor={theme.accent}
        maximumTrackTintColor={theme.highlight}
        thumbTintColor={theme.secondary}
      />
      <Text style={styles.mainText}>Current time: {calculateHours()}</Text>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.mainText}>Set new time</Text>
      </TouchableOpacity>
    </View>
  );
}
