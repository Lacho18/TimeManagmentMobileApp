import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useMyFont } from "../../context/FontContext";

export default function SingleAnswerQuestion({
  question,
  currentQuestionIndex,
  answerQuestionHandler,
  userAnswer,
}) {
  const { theme } = useTheme();
  const { font } = useMyFont();

  //Sends the answer to the upper component
  function onGivenAnswer(answerIndex) {
    answerQuestionHandler(answerIndex, currentQuestionIndex);
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
      borderWidth: 2,
      borderColor: theme.highlight,
      backgroundColor: theme.primary,
      borderRadius: 15,
    },
    answerBox: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      borderWidth: 1,
      backgroundColor: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    answerText: {
      fontSize: 21,
      color: theme.text,
      textAlign: "left",
      fontFamily: font.regular,
    },
    blackDot: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: "black",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.allAnswersDiv}>
        {question.answers.map((answer, index) => (
          <View key={index} style={styles.answerDiv}>
            <Text style={styles.answerText}>{answer}</Text>
            <Pressable
              onPress={() => {
                onGivenAnswer(index);
              }}
              style={styles.answerBox}
            >
              {userAnswer && userAnswer === index && (
                <View style={styles.blackDot}></View>
              )}
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
