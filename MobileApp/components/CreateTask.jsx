import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function CreateTask({ closeAddTaskMenu }) {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "90%",
      position: "absolute",
      bottom: 0,
      backgroundColor: theme.primary,
      zIndex: 40,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },

    closeButton: {
      width: 40,
      height: 40,
      backgroundColor: "red",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 0,
      borderTopRightRadius: 20,
    },
  });
  return (
    <View style={styles.mainDiv}>
      <Text>Nigga</Text>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          closeAddTaskMenu();
        }}
      >
        <Fontisto name="close-a" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
