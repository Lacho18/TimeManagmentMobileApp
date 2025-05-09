import { View, Text } from "react-native";
import SingleAnswerQuestion from "./SingleAnswerQuestion";
import MultipleAnswerQuestion from "./MultipleAnswerQuestion";
import PercentAnswerQuestion from "./PercentAnswerQuestion";

export default function BaseQuestionComponent({
  currentQuestion,
  currentQuestionIndex,
  answerQuestionHandler,
  userAnswer,
  isSwiperActive,
}) {
  //Decides what component to render by the type of the question
  if (currentQuestion.type === "singleAnswer") {
    return (
      <SingleAnswerQuestion
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        answerQuestionHandler={answerQuestionHandler}
        userAnswer={userAnswer}
      />
    );
  } else if (currentQuestion.type === "multipleAnswer") {
    return (
      <MultipleAnswerQuestion
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        answerQuestionHandler={answerQuestionHandler}
        userAnswer={userAnswer}
      />
    );
  } else if (currentQuestion.type === "percentAnswer") {
    return (
      <PercentAnswerQuestion
        question={currentQuestion}
        currentQuestionIndex={currentQuestionIndex}
        answerQuestionHandler={answerQuestionHandler}
        userAnswer={userAnswer}
        isSwiperActive={isSwiperActive}
      />
    );
  }
}
