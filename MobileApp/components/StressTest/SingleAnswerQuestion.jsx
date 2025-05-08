import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SingleAnswerQuestion({ question, theme }) {
  const styles = StyleSheet.create({
    mainDiv: {
      alignSelf: "flex-start",
      display: "flex",
      gap: 50,
      width: "100%",
    },
    questionText: {
      fontSize: 30,
      color: theme.text,
      textAlign: "center",
    },
    allAnswersDiv: {
      display: "flex",
      gap: 20,
    },
    answerDiv: {
      display: "flex",
      flexDirection: "row",
      gap: 20,
      alignItems: "center",
      width: "100%",
    },
    answerBox: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      borderWidth: 1,
      backgroundColor: "white",
    },
    answerText: {
      paddingBottom: 5,
      fontSize: 25,
      color: theme.text,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.allAnswersDiv}>
        {question.answers.map((answer) => (
          <View style={styles.answerDiv}>
            <Pressable style={styles.answerBox}></Pressable>
            <Text style={styles.answerText}>{answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
