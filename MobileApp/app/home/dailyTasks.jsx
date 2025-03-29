import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";

export default function DailyTasks() {
  const { theme } = useTheme();

  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.background }}>
      <Text>Tasks</Text>
    </View>
  );
}
