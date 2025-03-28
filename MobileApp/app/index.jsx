import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";

export default function Index() {
  const { theme, toggleTheme } = useTheme();

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
    buttonStyle: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      display: "flex",
      flexDirection: "row",
      gap: 20,
      justifyContent: "space-between",
      alignItems: "center",
      borderWidth: 2,
      borderColor: theme.accent,
      backgroundColor: theme.background,
    },
    buttonText: {
      fontSize: 20,
      color: theme.text,
    },
  });

  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.primary }}>
      <Text style={styles.title}>EasePlan</Text>
      <Text style={styles.loginText}>Login</Text>
      <View style={{ gap: 20, marginTop: 40 }}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            registerUserHandler("Google");
          }}
        >
          <Text style={styles.buttonText}>Google</Text>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/images/Google__G__logo.svg.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            registerUserHandler("Email&Password");
          }}
        >
          <Text style={styles.buttonText}>email & password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/*
  <View style={{ display: "flex", gap: 5, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              toggleTheme("purple");
            }}
            style={{ width: 20, height: 20, backgroundColor: "purple" }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleTheme("lightBlue");
            }}
            style={{ width: 20, height: 20, backgroundColor: "lightblue" }}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              toggleTheme("earthColors");
            }}
            style={{ width: 20, height: 20, backgroundColor: "brown" }}
          ></TouchableOpacity>
        </View>
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: theme.background,
            marginTop: 20,
          }}
        ></View>
*/
