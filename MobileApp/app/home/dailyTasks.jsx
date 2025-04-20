import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useUser } from "../../context/UserContext";

export default function DailyTasks() {
  const { theme } = useTheme();
  const { loading } = useUser();

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.background }}>
      <Text>Tasks</Text>
    </View>
  );
}
