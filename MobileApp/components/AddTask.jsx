import { TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function AddTask() {
  const styles = StyleSheet.create({
    buttonStyle: {
      position: "absolute",
      width: 60,
      height: 60,
      borderWidth: 4,
      borderRadius: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
      left: "75%",
      top: "80%",
    },
  });
  return (
    <TouchableOpacity style={styles.buttonStyle}>
      <FontAwesome6 name="add" size={28} color="black" />
    </TouchableOpacity>
  );
}
