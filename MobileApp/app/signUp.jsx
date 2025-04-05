import { useTheme } from "../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { validateEmail } from "../functions/validateEmail";
import { validatePassword } from "../functions/validatePassword";
import { createUser } from "../database/userController";

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
    const myValidateEmail = validateEmail(newUserData.email);
    const myValidatePassword = validatePassword(newUserData.password);

    //Sets the error messages and stop the function from executing
    if (myValidateEmail !== "Success" || myValidatePassword !== "Success") {
      if (myValidateEmail !== "Success") {
        setErrors((oldValue) => {
          return { ...oldValue, emailError: myValidateEmail };
        });
      } else {
        setErrors((oldValue) => {
          return { ...oldValue, emailError: "" };
        });
      }

      if (myValidatePassword !== "Success") {
        setErrors((oldValue) => {
          return { ...oldValue, passwordError: myValidatePassword };
        });
      } else {
        setErrors((oldValue) => {
          return { ...oldValue, passwordError: "" };
        });
      }

      return;
    }

    //Creates and authorize the new user
    const createUserResult = await createUser(newUserData);
    //const createUser = "";

    if (createUserResult === "Success") {
      console.log("Aideeee. Ydri sirene");
    } else {
      console.log(createUserResult);
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
          {errors.passwordError !== "" && (
            <Text style={{ ...GLOBAL_STYLES.errorText }}>
              {errors.passwordError}
            </Text>
          )}
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
            submitHandler();
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
