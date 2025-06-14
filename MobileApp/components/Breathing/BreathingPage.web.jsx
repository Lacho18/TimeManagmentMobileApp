import { Text, View } from "react-native";
import { useMyFont } from "../../context/FontContext";

export default function Breathing({ theme }) {
  const { font } = useMyFont();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text
        style={{ fontSize: 24, color: theme.text, fontFamily: font.regular }}
      >
        This page is not supported on the browser
      </Text>
    </View>
  );
}
