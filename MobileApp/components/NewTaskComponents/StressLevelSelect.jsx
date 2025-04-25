import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { STRESS_LEVELS } from "../../constants/StressLevel";

export default function StressLevelSelect({
  selectedStressLevel,
  changeStressLevel,
}) {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 7,
    },
    buttonStyle: {
      width: "auto",
      minWidth: 55,
      paddingLeft: 5,
      paddingRight: 5,
      height: 40,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 15,
    },
  });

  return (
    <View style={styles.container}>
      {STRESS_LEVELS.map((stressLevel) => {
        return (
          <TouchableOpacity
            style={{
              ...styles.buttonStyle,
              backgroundColor:
                selectedStressLevel === stressLevel.stressValue
                  ? stressLevel.lightColor
                  : stressLevel.backgroundColor,
            }}
            onPress={() =>
              changeStressLevel("stressLevel", stressLevel.stressValue)
            }
          >
            <Text style={{ color: stressLevel.textColor }}>
              {stressLevel.textDescription}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
