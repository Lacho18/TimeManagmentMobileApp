import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMyFont } from "../context/FontContext";
import { useWarning } from "../context/WarningContext";

export default function WarningComponent({ theme }) {
  const { warningMessage, clearWarning } = useWarning();
  const { font } = useMyFont();
  const styles = StyleSheet.create({
    mainDiv: {
      position: "absolute",
      width: "85%",
      height: 300,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderWidth: 5,
      borderColor: theme.secondary,
      borderRadius: 18,
      backgroundColor: theme.primary,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: 15,
      zIndex: 120,
    },

    questionText: {
      fontSize: 18,
      color: theme.text,
      textAlign: "center",
      fontFamily: font.regular,
    },

    buttonsDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      width: "90%",
    },

    buttonStructure: {
      width: 60,
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.accent,
    },

    buttonText: {
      fontSize: 18,
      color: theme.text,
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{warningMessage}</Text>
      <View style={styles.buttonsDiv}>
        <TouchableOpacity style={styles.buttonStructure} onPress={clearWarning}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
