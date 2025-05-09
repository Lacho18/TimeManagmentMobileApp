import { View, Text } from "react-native";
import SingleAnswerQuestion from "./SingleAnswerQuestion";
import MultipleAnswerQuestion from "./MultipleAnswerQuestion";

export default function BaseQuestionComponent({ currentQuestion }) {
  if (currentQuestion.type === "singleAnswer") {
    return <SingleAnswerQuestion question={currentQuestion} />;
  } else if (currentQuestion.type === "multipleAnswer") {
    return <MultipleAnswerQuestion question={currentQuestion} />;
  }

  return (
    <View>
      <Text>Yo</Text>
    </View>
  );
}
