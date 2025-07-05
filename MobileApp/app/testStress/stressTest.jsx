import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useStressTest } from "../../context/StressTestContext";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import BaseQuestionComponent from "../../components/StressTest/BaseQuestionComponent";
import { router } from "expo-router";
import { useMyFont } from "../../context/FontContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";
import { useUser } from "../../context/UserContext";
import { createLog } from "../../database/logsController";
import { formatDateMonthName } from "../../utils/dateUtil";

const screenWidth = Dimensions.get("window").width - 10;

export default function StressTest() {
  const { theme } = useTheme();
  const { stressTestQuestions } = useStressTest();
  const { font } = useMyFont();
  const { user } = useUser();

  //Reference to the carousel
  const carouselRef = useRef(null);
  //The user answers stored in an array ref
  const userAnswers = useRef([]);

  //fills the array of answers with nulls
  while (userAnswers.current.length < stressTestQuestions.length) {
    userAnswers.current.push(null);
  }

  //The current question index
  const [index, setIndex] = useState(0);
  //Percentage value from the current value index. Used for progress bar
  const [progressPercent, setProgressPercent] = useState(0);

  //Follows when the carousel to be active. It is only not active when the user uses Slider on the PercentAnswerQuestion type
  const [activeSwiper, setActiveSwiper] = useState(false);

  //Calculates the percent of the progression
  useEffect(() => {
    if (stressTestQuestions.length > 0) {
      setProgressPercent((index / stressTestQuestions.length) * 100);
    } else {
      setProgressPercent(0);
    }
  }, [index]);

  //Function that executes every time the user submit answer
  function answerQuestionHandler(userAnswer, currentQuestionIndex) {
    //Stores the user answers
    userAnswers.current[currentQuestionIndex] = userAnswer;

    //Calculates the next index because when answer is given the questions automatically goes forward
    const nextIndex = currentQuestionIndex + 1;

    //If the question is not last update the question
    if (nextIndex < stressTestQuestions.length) {
      setIndex(currentQuestionIndex + 1);
      carouselRef.current.scrollTo({
        index: nextIndex,
        animated: true,
      });
      //Update the percentage to 100 on the last question submit
    } else setProgressPercent(100);
  }

  async function submitStressTestAnswers() {
    let stressPoints = 0;

    stressTestQuestions.forEach((question, index) => {
      if (question.pointAnswer === userAnswers.current[index]) {
        stressPoints++;
      }
    });
    let stressLevel = stressPoints * 10;

    //Creating log for completing test
    await createLog(
      `Completed stress test on date ${formatDateMonthName(
        new Date(),
        false,
        true
      )} with level: ${stressLevel}`,
      user.id
    );

    const userDocRef = doc(db, "Users", user.id);

    await updateDoc(userDocRef, {
      stressLevels: arrayUnion({
        value: stressLevel,
        date: new Date(),
      }),
    });

    router.back();
  }

  const styles = StyleSheet.create({
    mainDiv: {
      width: "100%",
      height: "100%",
      overflow: "scroll",
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
      fontFamily: font.bold,
    },
    progressionText: {
      fontSize: 30,
      fontStyle: "italic",
      color: theme.text,
      fontFamily: font.regular,
    },
    progressBarDiv: {
      width: "100%",
      height: 25,
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
      backgroundColor: theme.highlight,
    },
    submitButton: {
      alignSelf: "center",
      width: 200,
      height: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.primary,
      padding: 20,
      borderRadius: 18,
    },
    submitButtonText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      textAlign: "center",
      fontFamily: font.regular,
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
        enabled={!activeSwiper}
        onProgressChange={(offsetProgress, absoluteProgress) => {
          // Lock interaction while in transition
          const isScrolling = Math.abs(offsetProgress % 1) > 0.01;

          // disables swiping while moving
          setActiveSwiper(isScrolling);
        }}
        onSnapToItem={(itemIndex) => {
          setIndex((oldValue) => {
            const diff = Math.abs(itemIndex - oldValue);

            if (diff <= 1) {
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
            userAnswer={userAnswers.current[index]}
            isSwiperActive={(value) => setActiveSwiper(value)}
          />
        )}
      />

      <View style={styles.progressBarDiv}>
        <View style={styles.progressBar}>
          <View
            style={[styles.forwardProgress, { width: `${progressPercent}%` }]}
          ></View>
          <View style={{ backgroundColor: theme.accent }}></View>
        </View>
      </View>
      {!userAnswers.current.includes(null) && (
        <TouchableOpacity
          style={styles.submitButton}
          onPress={submitStressTestAnswers}
        >
          <Text style={styles.submitButtonText}>Submit stress test form</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
