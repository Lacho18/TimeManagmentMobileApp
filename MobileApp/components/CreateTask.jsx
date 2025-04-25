import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function CreateTask() {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "90%",
      backgroundColor: theme.primary,
      zIndex: 20,
    },
  });
  return (
    <View style={styles.mainDiv}>
      <Text>Nigga</Text>
    </View>
  );
}
