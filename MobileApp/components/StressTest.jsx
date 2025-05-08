import { StyleSheet, Text, View } from "react-native";
import useTheme from "../context/ThemeContext";

export default function StressTest() {
  const { theme } = useTheme();

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
