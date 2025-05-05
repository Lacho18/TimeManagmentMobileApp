import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";

export default function Overview() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 10,
      gap: 15,
      position: "relative",
    },

    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
  });

  return (
    <View style={styles.page}>
      <View>
        <Text>Upcoming</Text>
      </View>
    </View>
  );
}
