import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function SingleAnswerQuestion({ question }) {
  const { theme } = useTheme();

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
    answerBox: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      borderWidth: 1,
      backgroundColor: "white",
    },
    answerText: {
      paddingBottom: 5,
      fontSize: 21,
      color: theme.text,
      textAlign: "left",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.allAnswersDiv}>
        {question.answers.map((answer) => (
          <View style={styles.answerDiv}>
            <Text style={styles.answerText}>{answer}</Text>
            <Pressable style={styles.answerBox}></Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
