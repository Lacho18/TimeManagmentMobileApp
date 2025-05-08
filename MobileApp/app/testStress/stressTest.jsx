import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useStressTest } from "../../context/StressTestContext";
import SingleAnswerQuestion from "../../components/StressTest/SingleAnswerQuestion";
import { useState } from "react";

export default function StressTest() {
  const { theme } = useTheme();
  const { stressTestQuestions } = useStressTest();
  const [index, setIndex] = useState(0);

  console.log(stressTestQuestions);

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.background,
      position: "absolute",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      paddingVertical: 130,
      paddingHorizontal: 30,
      justifyContent: "space-around",
    },
    title: {
      fontSize: 55,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: theme.text,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.title}>Stress test</Text>
      <SingleAnswerQuestion question={stressTestQuestions[0]} theme={theme} />
    </View>
  );
}
