import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

//icons
import Ionicons from "@expo/vector-icons/Ionicons";

import ColorThemeSelector from "../../components/ColorThemeSelector";
import { router } from "expo-router";
import { useEffect } from "react";
import { useStressTest } from "../../context/StressTestContext";
import StressTest from "../testStress/stressTest";

export default function Profile() {
  const { theme } = useTheme();
  const { user, logout, loading } = useUser();
  const { stressTest, startStressTest, endStressTest } = useStressTest();

  //Checks if the data for user is loading or if the user is found. Does not return anything if so.
  if (loading || !user) return null;

  async function signOutHandler() {
    await logout();
    router.replace("/");
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    headerDiv: {
      display: "flex",
      flexDirection: "row",
      gap: 18,
      alignItems: "center",
      width: "100%",
      height: 40,
      paddingLeft: 20,
      paddingRight: 20,
      boxSizing: "border-box",
      backgroundColor: theme.primary,
      borderBottomWidth: 3,
      borderBottomColor: theme.secondary,
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: "50%",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
    },
    buttonsDiv: {
      margin: 10,
      padding: 5,
      display: "flex",
      gap: 15,
    },
    buttonStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 20,
      paddingLeft: 5,
      paddingRight: 5,
    },
    buttonText: {
      color: theme.text,
      fontSize: 17,
    },
  });

  return (
    <View style={{ ...styles.page, backgroundColor: theme.background }}>
      <View style={styles.headerDiv}>
        <Image style={styles.profileImage} source={{ uri: user.image }} />
        <Text style={styles.titleText}>{user.name}</Text>
      </View>
      <View style={styles.buttonsDiv}>
        <ColorThemeSelector
          buttonStyle={styles.buttonStyle}
          buttonText={styles.buttonText}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={signOutHandler}>
          <Ionicons
            name="person-remove-sharp"
            size={28}
            color={theme.secondary}
          />
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            startStressTest();
          }}
        >
          <Ionicons name="newspaper" size={28} color={theme.secondary} />
          <Text style={styles.buttonText}>Make stress test</Text>
        </TouchableOpacity>
      </View>
      <Text>Profile</Text>

      {stressTest && <StressTest />}
    </View>
  );
}
