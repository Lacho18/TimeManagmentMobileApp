import { StyleSheet, Text, View } from "react-native";

export default function CalmingVideo({ theme }) {
  const styles = StyleSheet.create({
    mainDiv: {
      position: "absolute",
      width: "85%",
      height: 300,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderWidth: 5,
      borderColor: theme.secondary,
      borderRadius: 18,
      backgroundColor: theme.primary,
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      padding: 15,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>123</Text>
    </View>
  );
}
