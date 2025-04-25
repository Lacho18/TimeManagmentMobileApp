import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { useTheme } from "../context/ThemeContext";

const screenHeight = Dimensions.get("window").height;

export default function CreateTask({ closeAddTaskMenu, visible }) {
  const { theme } = useTheme();
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : screenHeight,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "90%",
      zIndex: 100,
    },
    panel: {
      flex: 1,
      backgroundColor: theme.primary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      elevation: 10,
    },
    closeButton: {
      width: 40,
      height: 40,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 0,
      top: 0,
      borderTopRightRadius: 20,
    },
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.panel}>
        <Text>Some text</Text>
        <TouchableOpacity style={styles.closeButton} onPress={closeAddTaskMenu}>
          <Fontisto name="close-a" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
