import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const [sliderValue, setSliderValue] = useState(userAnswer ? userAnswer : 50);

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
    sliderTextValue: {
      fontSize: 25,
      color: theme.text,
      fontWeight: "bold",
    },
    submitButton: {
      alignSelf: "center",
      width: 100,
      height: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.primary,
      padding: 5,
      borderRadius: 20,
    },
    submitButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
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
        minimumTrackTintColor={theme.secondary} // color of the left side of the thumb
        maximumTrackTintColor={theme.accent} // color of the right side of the thumb
        thumbTintColor={theme.primary}
      />
      <Text style={styles.sliderTextValue}>{sliderValue}</Text>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          answerQuestionHandler(sliderValue, currentQuestionIndex);
        }}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
