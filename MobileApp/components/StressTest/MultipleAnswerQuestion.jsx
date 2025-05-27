import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";
import CheckBox from "expo-checkbox";
import { useMyFont } from "../../context/FontContext";

export default function MultipleAnswerQuestion({
  question,
  currentQuestionIndex,
  answerQuestionHandler,
  userAnswer,
}) {
  const { theme } = useTheme();
  const { font } = useMyFont();

  //If thew user has already answered this question set the answers array to his previous one. Or else set it to null
  const [selectedAnswers, setSelectedAnswers] = useState(
    userAnswer ? userAnswer : []
  );

  //Sends the answers array
  function submitAnswer() {
    answerQuestionHandler(selectedAnswers, currentQuestionIndex);
  }

  //Handles check box click
  function selectedAnswerHandler(answerIndex) {
    //If thew answer is already selected remove it
    if (selectedAnswers.includes(answerIndex)) {
      setSelectedAnswers((oldValue) => {
        let newValue = [...oldValue];
        const indexToRemove = newValue.indexOf(answerIndex);
        newValue.splice(indexToRemove, 1);

        return newValue;
      });
    }
    //If the answer is not selected add it
    else {
      setSelectedAnswers((oldValue) => {
        const newValue = [...oldValue, answerIndex];

        return newValue;
      });
    }
  }

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
      fontFamily: font.bold,
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
      padding: 20,
      boxSizing: "border-box",

      // iOS Shadow
      shadowColor: "black",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 1,

      // Android Shadow
      elevation: 7,

      borderRadius: 15,
    },
    answerText: {
      //paddingBottom: 5,
      //margin: 10,
      fontSize: 21,
      color: theme.text,
      textAlign: "left",
      fontFamily: font.regular,
    },
    checkBox: {
      width: 20,
      height: 20,
    },
    submitButton: {
      alignSelf: "center",
      width: 100,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.primary,
      padding: 10,
      borderRadius: 20,
    },
    submitButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.allAnswersDiv}>
        {question.answers.map((answer, index) => (
          <View key={index} style={styles.answerDiv}>
            <Text style={styles.answerText}>{answer}</Text>
            <CheckBox
              value={selectedAnswers.includes(index)}
              onValueChange={() => {
                selectedAnswerHandler(index);
              }}
              style={styles.checkBox}
            ></CheckBox>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={submitAnswer}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
