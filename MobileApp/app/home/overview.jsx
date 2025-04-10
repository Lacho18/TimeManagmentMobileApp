import { View, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";

export default function Overview() {
  const { theme } = useTheme();
  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.background }}>
      <Text>Upcoming</Text>
    </View>
  );
}
