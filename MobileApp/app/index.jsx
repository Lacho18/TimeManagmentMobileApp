import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import GoogleAuth from "../components/GoogleAuth";
import Notifications from "../components/Notifications";

import * as Calendar from "expo-calendar";

export default function Index() {
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
  console.log(theme);

  if (!theme) return;

  useEffect(() => {
    //Gets the theme before component is loaded
    async function setColorTheme() {
      const savedTheme = await AsyncStorage.getItem("theme");

      //Asks the user that the app will use the calendar of the device
      const { status } = await Calendar.requestCalendarPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access calendar was denied");
      }

      if (savedTheme) {
        toggleTheme(savedTheme);
      }
    }

    //Checks if the user is already logged in
    async function checkForLogInUser() {
      const userId = await AsyncStorage.getItem("@user");

      if (userId) {
        //await AsyncStorage.removeItem("@user");

        router.push("/home/dailyTasks");
      }
    }

    setColorTheme();
    checkForLogInUser();
  }, []);

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
      <TouchableOpacity
        style={{ width: 40, height: 40, backgroundColor: "brown" }}
        onPress={() => {
          router.push("/home/dailyTasks");
        }}
      ></TouchableOpacity>
      <Text style={styles.title}>EasePlan</Text>
      <Text style={styles.loginText}>Login</Text>
      <View style={{ gap: 20, marginTop: 40 }}>
        <GoogleAuth theme={theme} router={router} />
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
      <Notifications />
    </View>
  );
}
