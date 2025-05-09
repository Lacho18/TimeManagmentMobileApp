import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { CheckBox } from "react-native-web";
import { useState } from "react";

export default function MultipleAnswerQuestion({ question }) {
  const { theme } = useTheme();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const styles = StyleSheet.create({
    mainDiv: {
      alignSelf: "flex-start",
      display: "flex",
      gap: 50,
      width: "100%",
      marginTop: 20,
    },
    questionText: {
      fontSize: 30,
      color: theme.text,
      textAlign: "center",
      fontWeight: 600,
    },
    allAnswersDiv: {
      display: "flex",
      alignSelf: "center",
      width: "85%",
      gap: 20,
    },
    answerDiv: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      gap: 20,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      padding: 12,

      // iOS Shadow
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 }, // No offset
      shadowOpacity: 1,
      shadowRadius: 1, // Very small blur

      // Android Shadow
      elevation: 7,

      borderRadius: 15,
    },
    answerText: {
      paddingBottom: 5,
      fontSize: 21,
      color: theme.text,
      textAlign: "left",
    },
    checkBox: {
      width: 20,
      height: 20,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.allAnswersDiv}>
        {question.answers.map((answer) => (
          <View key={answer.id} style={styles.answerDiv}>
            <Text style={styles.answerText}>{answer}</Text>
            <CheckBox
              style={styles.checkBox}
              tintColors={{ true: "#FF8C00", false: "gray" }}
            ></CheckBox>
          </View>
        ))}
      </View>
    </View>
  );
}
