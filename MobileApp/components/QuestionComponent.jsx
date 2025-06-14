import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useMyFont } from "../context/FontContext";

export default function QuestionComponent({
  theme,
  questionData,
  onYesAnswer,
  onNoAnswer,
}) {
  const { font } = useMyFont();
  const styles = StyleSheet.create({
    mainDiv: {
      position: "absolute",
      width: "85%",
      height: 300,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderWidth: 3,
      borderColor: theme.highlight,
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
      width: 50,
      height: 40,
      borderRadius: 10,
      borderWidth: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    buttonText: {
      fontSize: 18,
      color: theme.text,
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>
        {questionData.question}{" "}
        <Text style={{ fontWeight: "bold" }}>
          {questionData.subQuestionData}
        </Text>
      </Text>
      <View style={styles.buttonsDiv}>
        <TouchableOpacity
          style={{ ...styles.buttonStructure, backgroundColor: "#77dd77" }}
          onPress={() => onYesAnswer(questionData.id)}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.buttonStructure, backgroundColor: "#ff6961" }}
          onPress={onNoAnswer}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
