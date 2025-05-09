import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useStressTest } from "../../context/StressTestContext";
import SingleAnswerQuestion from "../../components/StressTest/SingleAnswerQuestion";
import { useEffect, useState } from "react";

export default function StressTest() {
  const { theme } = useTheme();
  const { stressTestQuestions } = useStressTest();
  const [index, setIndex] = useState(4);
  const [progressPercent, setProgressPercent] = useState(0);

  //Calculates the percent of the progression
  useEffect(() => {
    if (stressTestQuestions.length > 0) {
      setProgressPercent((index / stressTestQuestions.length) * 100);
    } else {
      setProgressPercent(0);
    }
  }, [index]);

  console.log(progressPercent);

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.background,
      position: "absolute",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: 15,
      paddingVertical: 30,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 45,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: theme.text,
    },
    progressionText: {
      fontSize: 30,
      fontStyle: "italic",
      color: theme.text,
    },
    progressBarDiv: {
      width: "100%",
      height: 250,
      display: "flex",
      justifyContent: "center",
    },
    progressBar: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 7,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black",
      alignSelf: "flex-end",
    },
    forwardProgress: {
      backgroundColor: theme.secondary,
    },
  });

  if (stressTestQuestions.length == 0) return <Text>Loading...</Text>;

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.title}>Stress test</Text>
      <Text style={styles.progressionText}>
        {index + 1}/{stressTestQuestions.length}
      </Text>
      <SingleAnswerQuestion question={stressTestQuestions[0]} theme={theme} />

      <View style={styles.progressBarDiv}>
        <View style={styles.progressBar}>
          <View
            style={[styles.forwardProgress, { width: `${progressPercent}%` }]}
          ></View>
          <View></View>
        </View>
      </View>
    </View>
  );
}
