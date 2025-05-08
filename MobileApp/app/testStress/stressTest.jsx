import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useStressTest } from "../../context/StressTestContext";

export default function StressTest() {
  const { theme } = useTheme();
  const { stressTestQuestions } = useStressTest();

  console.log(stressTestQuestions);

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.background,
      position: "absolute",
      zIndex: 100,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>123</Text>
    </View>
  );
}
