import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useState } from "react";

export default function StressLevelSelector({ theme }) {
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
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>Stress level</Text>
      <Text>Following your stress levels helps in reducing them</Text>
      <Slider
        style={{ width: 300, height: 40 }}
        minimumValue={0}
        maximumValue={100}
        value={stressLevel}
        onValueChange={(value) => setStressLevel(Math.round(value))}
        minimumTrackTintColor={theme.secondary} // color of the left side of the thumb
        maximumTrackTintColor={theme.accent} // color of the right side of the thumb
        thumbTintColor={theme.primary}
      />
      <Text>
        If you are not sure how you fill, you can answer some questions.
      </Text>
      <TouchableOpacity>
        <Text>Stress test</Text>
      </TouchableOpacity>
    </View>
  );
}
