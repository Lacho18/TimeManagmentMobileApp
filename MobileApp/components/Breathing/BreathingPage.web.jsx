import { Text, View } from "react-native";

export default function Breathing({ theme }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ fontSize: 21, color: theme.text }}>
        This page is not supported on the browser
      </Text>
    </View>
  );
}
