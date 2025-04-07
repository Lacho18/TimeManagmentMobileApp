import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";

export default function BreathingAnimation() {
  const { theme } = useTheme();
  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.background }}>
      <Text>Breathing technique</Text>
    </View>
  );
}
