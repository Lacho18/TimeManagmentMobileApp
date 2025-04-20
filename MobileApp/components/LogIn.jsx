import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import logInWithEmailAndPassword from "../functions/logInWithEmailAndPassword";

export default function LogIn({ GLOBAL_STYLES, theme, router }) {
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  function inputChangeHandler(value, field) {
    setLogInData((oldValue) => {
      return { ...oldValue, [field]: value };
    });
  }

  async function logInHandler() {
    const user = await logInWithEmailAndPassword(logInData);

    if (user) {
      router.push("/home/dailyTasks");
    }
  }

  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ ...GLOBAL_STYLES.standardText, color: theme.text }}>
          Enter your email address
        </Text>
        <TextInput
          placeholder="email"
          onChangeText={(value) => {
            inputChangeHandler(value, "email");
          }}
          style={{ ...GLOBAL_STYLES.standardTextField }}
        />
      </View>
      <View style={{ gap: 10 }}>
        <Text style={{ ...GLOBAL_STYLES.standardText, color: theme.text }}>
          Enter your password
        </Text>
        <TextInput
          placeholder="password"
          onChangeText={(value) => {
            inputChangeHandler(value, "password");
          }}
          style={{ ...GLOBAL_STYLES.standardTextField }}
        />
      </View>

      <TouchableOpacity
        style={{
          ...GLOBAL_STYLES.buttonStyle,
          borderColor: theme.accent,
          backgroundColor: theme.background,
        }}
        onPress={() => {
          logInHandler();
        }}
      >
        <Text style={{ ...GLOBAL_STYLES.buttonText, color: theme.text }}>
          Log in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
