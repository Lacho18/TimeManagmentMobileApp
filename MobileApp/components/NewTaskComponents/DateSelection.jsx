import { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";

const screenHeight = Dimensions.get("window").height;

/*
    Napravi go kato v ToDoIst
    Dobavi button za Tommorow i tyka kakto i next week
    Napravi go cato calendar
    Chasut shte e ot otdelno pole kakto i produljitelnostta
*/

export default function DateSelection({ theme, visible }) {
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : screenHeight,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "100%",
      zIndex: 120,
    },
    panel: {
      flex: 1,
      backgroundColor: theme.secondary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      display: "flex",
      padding: 20,
      justifyContent: "",
      gap: 20,
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
        <Text>You are gay</Text>
      </View>
    </Animated.View>
  );
}
