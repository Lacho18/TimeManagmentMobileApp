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
        style={{ color: theme.text, fontSize: 18, fontFamily: font.regular }}
      >
        Simple view
      </Text>
      <Switch
        trackColor={{ false: theme.accent, true: theme.highlight }}
        thumbColor={isEnabled ? theme.highlight : theme.accent}
        ios_backgroundColor={theme.primary}
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
