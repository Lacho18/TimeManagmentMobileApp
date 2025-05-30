import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";

export default function StressLevelSelector({ theme, font }) {
  const [stressLevel, setStressLevel] = useState(0);

  const styles = StyleSheet.create({
    mainDiv: {
      width: "95%",
      height: 300,
      borderWidth: 3,
      borderColor: theme.accent,
      backgroundColor: theme.primary,
      borderRadius: 18,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
    },
    title: {
      fontSize: 18,
      fontFamily: font.bold,
      textAlign: "center",
      color: theme.text,
    },
    hint: {
      fontSize: 12,
      fontFamily: font.regular,
      fontStyle: "italic",
      color: theme.text,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View>
        <Text style={styles.title}>Stress level</Text>
        <Text style={styles.hint}>
          Following your stress levels helps in reducing them
        </Text>
      </View>

      <Slider
        style={{ width: 300, height: 60 }}
        minimumValue={0}
        maximumValue={100}
        value={stressLevel}
        onValueChange={(value) => setStressLevel(Math.round(value))}
        minimumTrackTintColor={theme.secondary}
        maximumTrackTintColor={theme.accent}
        thumbTintColor={theme.primary}
        tapToSeek={true}
      />
      <Text>{stressLevel}</Text>
      <Text style={styles.hint}>
        If you are not sure how you fill, you can answer some questions.
      </Text>
      <TouchableOpacity>
        <Text>Stress test</Text>
      </TouchableOpacity>
    </View>
  );
}
