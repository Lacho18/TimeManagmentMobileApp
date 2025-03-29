import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import axios from "axios";

export default function Index() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  //Gets the theme before component is loaded
  useEffect(() => {
    async function setColorTheme() {
      const savedTheme = await AsyncStorage.getItem("theme");

      if (savedTheme) {
        toggleTheme(savedTheme);
      }
    }

    setColorTheme();
  }, []);

  async function registerUserHandler(type) {
    console.log(type);
    //Tyka si sloshi IP na kompytura s axios.post
  }

  //Component styles
  const styles = StyleSheet.create({
    title: {
      fontSize: 60,
      textTransform: "uppercase",
      fontWeight: "bold",
      color: theme.text,
    },
    loginText: {
      fontSize: 40,
      textTransform: "uppercase",
      color: theme.text,
    },
  });

  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.primary }}>
      <Text style={styles.title}>EasePlan</Text>
      <Text style={styles.loginText}>Login</Text>
      <View style={{ gap: 20, marginTop: 40 }}>
        <TouchableOpacity
          style={{
            ...GLOBAL_STYLES.buttonStyle,
            borderColor: theme.accent,
            backgroundColor: theme.background,
          }}
          onPress={() => {
            registerUserHandler("Google");
          }}
        >
          <Text style={{ ...GLOBAL_STYLES.buttonText, color: theme.text }}>
            Google
          </Text>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/images/Google__G__logo.svg.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...GLOBAL_STYLES.buttonStyle,
            borderColor: theme.accent,
            backgroundColor: theme.background,
          }}
          onPress={() => {
            router.push("/signUp");
          }}
        >
          <Text style={{ ...GLOBAL_STYLES.buttonText, color: theme.text }}>
            email & password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
