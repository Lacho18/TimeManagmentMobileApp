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

  console.log(stressTestQuestions);

  //fills the array of answers with nulls
  while (userAnswers.current.length < stressTestQuestions.length) {
    userAnswers.current.push(null); // Or use any default value like 'null'
  }

  const [index, setIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  console.log("User answers");
  console.log(userAnswers.current);

  //Calculates the percent of the progression
  useEffect(() => {
    if (stressTestQuestions.length > 0) {
      setProgressPercent((index / stressTestQuestions.length) * 100);
    } else {
      setProgressPercent(0);
    }
  }, [index]);

  function answerQuestionHandler(userAnswer, currentQuestionIndex) {
    //Stores the user answers
    userAnswers.current[currentQuestionIndex] = userAnswer;

    const nextIndex = (index + 1) % stressTestQuestions.length;
    setIndex(currentQuestionIndex + 1);

    if (nextIndex < stressTestQuestions.length) {
      carouselRef.current.scrollTo({
        index: nextIndex,
        animated: true,
      });
    }
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
        loop={false}
        width={screenWidth}
        height={600}
        autoPlay={false}
        data={stressTestQuestions}
        scrollAnimationDuration={1000}
        onSnapToItem={(itemIndex) => {
          setIndex((oldValue) => {
            if (itemIndex === oldValue - 1 || itemIndex === oldValue + 1) {
              return itemIndex;
            } else {
              return oldValue;
            }
          });
        }}
        renderItem={({ item, index }) => (
          <BaseQuestionComponent
            currentQuestion={item}
            currentQuestionIndex={index}
            answerQuestionHandler={answerQuestionHandler}
            userAnswer={userAnswers[index]}
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
