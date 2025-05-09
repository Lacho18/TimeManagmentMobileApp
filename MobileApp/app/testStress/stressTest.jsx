import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useStressTest } from "../../context/StressTestContext";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import BaseQuestionComponent from "../../components/StressTest/BaseQuestionComponent";

const screenWidth = Dimensions.get("window").width - 10;

export default function StressTest() {
  const { theme } = useTheme();
  const { stressTestQuestions } = useStressTest();

  const carouselRef = useRef(null);
  const userAnswers = useRef([]);

  const [index, setIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  //Calculates the percent of the progression
  useEffect(() => {
    if (stressTestQuestions.length > 0) {
      setProgressPercent((index / stressTestQuestions.length) * 100);
    } else {
      setProgressPercent(0);
    }
  }, [index]);

  function answerQuestionHandler(userAnswer) {
    setIndex((oldValue) => ++oldValue);
    //carouselRef.current.next();
    const nextIndex = (index + 1) % stressTestQuestions.length;
    console.log(index);
    console.log(nextIndex);
    carouselRef.current.scrollTo({
      index: nextIndex,
      animated: true,
    });
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.background,
      position: "absolute",
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      gap: 15,
      paddingVertical: 30,
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 45,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: theme.text,
    },
    progressionText: {
      fontSize: 30,
      fontStyle: "italic",
      color: theme.text,
    },
    progressBarDiv: {
      width: "100%",
      height: 250,
      display: "flex",
      justifyContent: "center",
    },
    progressBar: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 7,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black",
      alignSelf: "flex-end",
    },
    forwardProgress: {
      backgroundColor: theme.secondary,
    },
  });

  if (stressTestQuestions.length == 0) return <Text>Loading...</Text>;

  return (
    <View style={styles.mainDiv}>
      <Text style={styles.title}>Stress test</Text>
      <Text style={styles.progressionText}>
        {index + 1}/{stressTestQuestions.length}
      </Text>

      <Carousel
        ref={carouselRef}
        loop
        width={screenWidth}
        height={500}
        autoPlay={false}
        data={stressTestQuestions}
        scrollAnimationDuration={1000}
        renderItem={({ item, index }) => (
          <BaseQuestionComponent
            currentQuestion={item}
            currentQuestionIndex={index}
            answerQuestionHandler={answerQuestionHandler}
            userAnswer={userAnswers.length > index ? userAnswers[index] : null}
          />
        )}
      />

      <View style={styles.progressBarDiv}>
        <View style={styles.progressBar}>
          <View
            style={[styles.forwardProgress, { width: `${progressPercent}%` }]}
          ></View>
          <View></View>
        </View>
      </View>
    </View>
  );
}
