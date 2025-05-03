import { StyleSheet, Text, View } from "react-native";

export default function MenuOptions({ theme }) {
  const styles = StyleSheet.create({
    mainDiv: {
      width: 150,
      height: 200,
      backgroundColor: theme.primary,
      borderRadius: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>Hello my niggas</Text>
    </View>
  );
}
