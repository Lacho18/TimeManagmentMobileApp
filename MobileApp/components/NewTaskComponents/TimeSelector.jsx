import { View, Text, StyleSheet } from "react-native";

export default function TimeSelector() {
  const styles = StyleSheet.create({
    mainDiv: {
      width: "90%",
      height: "80%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
      backgroundColor: "brown",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>123</Text>
    </View>
  );
}
