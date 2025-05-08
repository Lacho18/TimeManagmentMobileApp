import { Pressable, Text, View } from "react-native";

export default function SingleAnswerQuestion({ question, theme }) {
  return (
    <View>
      <Text>{question.question}</Text>
      <View>
        {question.answers.map((answer) => (
          <View>
            <Pressable></Pressable>
            <Text>{answer}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
