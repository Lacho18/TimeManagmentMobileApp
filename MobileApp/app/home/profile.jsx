import { Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";

export default function Profile() {
  const { theme } = useTheme();
  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.background }}>
      <Text>Profile</Text>
    </View>
  );
}
