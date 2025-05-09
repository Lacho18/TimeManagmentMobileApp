import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Slider from "@react-native-community/slider";
import { useState } from "react";

export default function PercentAnswerQuestion({
  question,
  currentQuestionIndex,
  answerQuestionHandler,
  userAnswer,
  isSwiperActive,
}) {
  /*
        1. Dovurshi tozi vid vuprosi (stilizirane, prashtane na otgovor)
        2. Napravi go sled submit da se vrushta na poslednata stranica
        3. Pogledni tova sus subitiqta dali raboti (Ako trqbva dobavi refresh token fynkcionalnost)
    */

  const { theme } = useTheme();

  const [sliderValue, setSliderValue] = useState(50);

  const styles = StyleSheet.create({
    mainDiv: {
      alignSelf: "flex-start",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 50,
      width: "100%",
      marginTop: 20,
    },
    questionText: {
      fontSize: 30,
      color: theme.text,
      textAlign: "center",
      fontWeight: 600,
    },
    slider: {},
  });

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.questionText}>{question.question}</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        value={sliderValue}
        onValueChange={(value) => setSliderValue(Math.round(value))}
        onTouchStart={() => isSwiperActive(true)}
        onTouchEnd={() => isSwiperActive(false)}
      />
      <Text>{sliderValue}</Text>
    </View>
  );
}
