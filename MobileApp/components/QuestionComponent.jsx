import { StyleSheet, Text, View } from "react-native";

export default function QuestionComponent({
  theme,
  question,
  subQuestionData,
  onYesAnswer,
  onNoAnswer,
}) {
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
      backgroundColor: theme.background,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>123</Text>
    </View>
  );
}
