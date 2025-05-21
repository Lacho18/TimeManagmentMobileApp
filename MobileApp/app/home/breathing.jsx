import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../../context/ThemeContext";

export default function Breathing() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    mainDiv: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <LottieView
        source={require("../../animations/BreathingSquire2.0.json")}
        autoPlay
        loop
        style={{ backgroundColor: theme.background }}
      />
    </View>
  );
}
