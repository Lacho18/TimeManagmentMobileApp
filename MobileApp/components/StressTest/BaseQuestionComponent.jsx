import { View, Text } from "react-native";
import SingleAnswerQuestion from "./SingleAnswerQuestion";

export default function BaseQuestionComponent({ currentQuestion }) {
  if (currentQuestion.type === "singleAnswer") {
    return <SingleAnswerQuestion question={currentQuestion} />;
  }

  return (
    <View>
      <Text>Yo</Text>
    </View>
  );
}
