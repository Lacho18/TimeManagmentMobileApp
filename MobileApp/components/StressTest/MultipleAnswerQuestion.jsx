import { StyleSheet, Text, View, CheckBox } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

export default function MultipleAnswerQuestion({
  question,
  answerQuestionHandler,
}) {
  const { theme } = useTheme();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  console.log(selectedAnswers);

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
    </View>
  );
}
