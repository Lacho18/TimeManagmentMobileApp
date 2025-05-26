import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useLocalSearchParams } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function Breathing() {
  const { theme } = useTheme();
  const { active } = useLocalSearchParams();

  const animations = [
    require("../../../animations/BreathingSquire2.0.json"),
    require("../../../animations/Breathing2.json"),
  ];

  const [activeAnimation, setActiveAnimation] = useState(active === "true");
  const [animation, setAnimation] = useState(
    "../../../animations/BreathingSquire2.0.json"
  );

  function getRandomAnimation() {
    const randomAnimationIndex = Math.round(Math.random() * animations.length);

    setAnimation(animations[randomAnimationIndex]);
  }

  const styles = StyleSheet.create({
    mainDiv: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    button: {
      width: 250,
      height: 250,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      paddingHorizontal: 40,
      backgroundColor: theme.primary,
      borderRadius: "50%",
      shadowColor: theme.secondary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.9,
      shadowRadius: 20,
      elevation: 20,
    },
    buttonText: {
      color: theme.text,
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  console.log(activeAnimation);

  if (activeAnimation == false) {
    return (
      <View style={styles.mainDiv}>
        <Pressable
          style={styles.button}
          onPress={() => {
            getRandomAnimation();
            setActiveAnimation(true);
          }}
        >
          <Text style={styles.buttonText}>Breathing exercise</Text>
        </Pressable>
      </View>
    );
  }

  if (animation !== "") {
    return (
      <View style={styles.mainDiv}>
        <LottieView
          source={animation}
          autoPlay
          loop
          style={{ width: width, height: height }}
        />
      </View>
    );
  }
}
