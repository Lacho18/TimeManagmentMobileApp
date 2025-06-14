import { TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "../../context/ThemeContext";

export default function AddTask({ showAddTaskMenu }) {
  const { theme } = useTheme();
  if (!theme) return;
  const styles = StyleSheet.create({
    buttonStyle: {
      position: "absolute",
      width: 60,
      height: 60,
      borderWidth: 2,
      borderColor: theme.accent,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.primary,
      left: "80%",
      top: "80%",
      zIndex: 30,
    },
  });
  return (
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => showAddTaskMenu()}
    >
      <FontAwesome6 name="add" size={28} color={theme.secondary} />
    </TouchableOpacity>
  );
}
