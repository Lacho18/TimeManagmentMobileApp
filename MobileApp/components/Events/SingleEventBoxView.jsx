import { View, Text, StyleSheet } from "react-native";

export default function SingleEventBoxView({ event, theme }) {
  const styles = StyleSheet.create({
    mainDiv: {
      width: "90%",
      height: 300,
      borderWidth: 3,
      borderColor: theme.primary,
      borderRadius: 18,
      display: "flex",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>Event page</Text>
    </View>
  );
}
