import { View, Text } from "react-native";
import SingleAnswerQuestion from "./SingleAnswerQuestion";
import MultipleAnswerQuestion from "./MultipleAnswerQuestion";

export default function BaseQuestionComponent({
  currentQuestion,
  currentQuestionIndex,
  answerQuestionHandler,
  userAnswer,
}) {
  if (currentQuestion.type === "singleAnswer") {
    return (
      <SingleAnswerQuestion
        question={currentQuestion}
        answerQuestionHandler={answerQuestionHandler}
      />
    );
  } else if (currentQuestion.type === "multipleAnswer") {
    return (
      <MultipleAnswerQuestion
        question={currentQuestion}
        answerQuestionHandler={answerQuestionHandler}
      />
    );
  }
}
