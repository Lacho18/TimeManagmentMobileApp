import { StyleSheet, Text, View } from "react-native";

export default function QuestionComponent({
  theme,
  questionData,
  onYesAnswer,
  onNoAnswer,
}) {
  console.log(questionData);
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
      justifyContent: "center",
      alignItems: "center",
      padding: 15,
    },

    questionText: {
      fontSize: 18,
      color: theme.text,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>
        {questionData.question} <Text style={{fontWeight: "bold"}}>{questionData.subQuestionData}</Text>
      </Text>
    </View>
  );
}
