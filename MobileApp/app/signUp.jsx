import { useTheme } from "../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { validateEmail } from "../functions/validateEmail";
import { validatePassword } from "../functions/validatePassword";

export default function SignUp() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  function inputChangeHandler(value, field) {
    setNewUserData((oldValue) => {
      return { ...oldValue, [field]: value };
    });
  }

  async function submitHandler() {
    const validateEmail = validateEmail(newUserData.email);
    const validatePassword = validatePassword(newUserData.password);

    if (validateEmail !== "Success" || validatePassword !== "Success") {
      if (validateEmail !== "Success") {
        setErrors((oldValue) => {
          return { ...oldValue, emailError: validateEmail };
        });
      }

      if (validatePassword !== "Success") {
        setErrors((oldValue) => {
          return { ...oldValue, passwordError: validatePassword };
        });
      }

      return;
    }
  }

  const styles = StyleSheet.create({
    backButton: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 55,
      height: 55,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      borderBottomRightRadius: 20,
      borderBottomWidth: 2,
      borderRightWidth: 2,
      borderBottomColor: theme.accent,
      borderRightColor: theme.accent,
    },
    backButtonText: {
      fontSize: 35,
      fontWeight: "bold",
    },
  });

  console.log(newUserData);

  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.primary }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          router.back();
        }}
      >
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={{ gap: 20 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ ...GLOBAL_STYLES.standardText, color: theme.text }}>
            Enter valid email address
          </Text>
          {errors.emailError !== "" && (
            <Text style={{ ...GLOBAL_STYLES.errorText }}>
              {errors.emailError}
            </Text>
          )}
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
        >
          <Text style={{ ...GLOBAL_STYLES.buttonText, color: theme.text }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
