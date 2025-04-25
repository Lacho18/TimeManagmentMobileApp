import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function AddTaskInputContainer({ theme }) {
  const [isFocused, setIsFocused] = useState(false);
  const styles = StyleSheet.create({
    labelText: {
      color: theme.background,
      fontSize: 18,
      fontWeight: 500,
    },
    inputField: {
      padding: 10,
      borderWidth: 1,
      borderColor: theme.background,
      fontSize: 20,
      borderRadius: 19,
    },
  });

  console.log(isFocused);

  return (
    <View>
      <Text style={styles.labelText}>Enter task name</Text>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.inputField,
          {
            borderColor: isFocused ? "green" : theme.background, // 👈 use your custom color here
          },
        ]}
        underlineColorAndroid="transparent"
        placeholder="Name"
      />
    </View>
  );
}
