import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useUser } from "../../context/UserContext";
import { doc, updateDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";

export default function SimpleViewSwitch({ theme, font, switchValue, userId }) {
  const { changeUserPreferences } = useUser();
  const [isEnabled, setIsEnabled] = useState(switchValue);

  function toggleSwitch() {
    setIsEnabled((previous) => !previous);
    changeUserPreferences("simpleView", !isEnabled);

    try {
      const docRef = doc(db, "Users", userId);

      updateDoc(docRef, {
        "preferences.simpleView": !isEnabled,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{ color: theme.text, fontSize: 17, fontFamily: font.regular }}
      >
        Simple view
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#2196F3" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
});
