import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { panicButtonHandler } from "../../functions/panicButtonHandler";

export default function CalmPanicButton({
  theme,
  font,
  userId,
  userStartTimeOfTheDay,
  userMinRestTime,
}) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  async function panicButtonPress() {
    await panicButtonHandler(userId, userStartTimeOfTheDay, userMinRestTime);
  }

  const SIZE = 85;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      position: "absolute",
      left: "50%",
      top: "80%",
      transform: "translateX(-50%)",
      zIndex: 50,
    },
    outerGlow: {
      width: SIZE + 60,
      height: SIZE + 60,
      borderRadius: (SIZE + 60) / 2,
      backgroundColor: theme.primary,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: theme.highlight,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.6,
      shadowRadius: 30,
    },
    middleGlow: {
      position: "absolute",
      width: SIZE + 40,
      height: SIZE + 40,
      borderRadius: (SIZE + 40) / 2,
      backgroundColor: theme.primary,
      opacity: 0.2,
      shadowColor: theme.highlight,
      shadowRadius: 30,
      shadowOpacity: 0.7,
      shadowOffset: { width: 0, height: 0 },
    },
    blurWrapper: {
      borderRadius: SIZE / 2,
      overflow: "hidden",
    },
    button: {
      width: SIZE,
      height: SIZE,
      borderRadius: SIZE / 2,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: theme.text,
      fontWeight: "600",
      fontSize: 18,
      letterSpacing: 1,
      textAlign: "center",
      fontFamily: font.regular,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.outerGlow, { transform: [{ scale: pulseAnim }] }]}
      >
        <View style={styles.middleGlow} />
        <BlurView intensity={150} style={styles.blurWrapper}>
          <Pressable onPress={panicButtonPress} style={styles.button}>
            <Text style={styles.text}>Panic button</Text>
          </Pressable>
        </BlurView>
      </Animated.View>
    </View>
  );
}
