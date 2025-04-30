import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TimeSelector({
  theme,
  dateType,
  currentSelectionOfDate,
}) {
  const [selectedTime, setSelectedTime] = useState(currentSelectionOfDate);

  const outerClockNumbers = Array.from({ length: 12 }, (_, i) => i);
  const innerClockNumbers = Array.from({ length: 12 }, (_, i) => i + 12);

  const outerRadius = 120;
  const innerRadius = 80;
  const centerX = 150;
  const centerY = 150;

  const styles = StyleSheet.create({
    mainDiv: {
      width: "90%",
      height: "80%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
      backgroundColor: theme.secondary,
      paddingTop: 20,
      display: "flex",
      alignItems: "center",
      gap: 10,
    },

    titleDiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },

    titleNumbers: {
      fontSize: 70,
      fontWeight: "bold",
      color: theme.background,
      backgroundColor: theme.highlight,
      width: 100,
      height: 100,
      display: "flex",
      justifyContent: "center",
      borderRadius: 10,
    },

    symbol: {
      fontSize: 70,
      color: theme.background,
      fontWeight: "bold",
    },

    clockDiv: {
      width: "90%",
      height: "80%",
      position: "relative",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View style={styles.titleDiv}>
        <Text style={styles.titleNumbers}>
          {selectedTime.getHours().toString().padStart(2, "0")}
        </Text>
        <Text style={styles.symbol}>:</Text>
        <Text style={styles.titleNumbers}>
          {selectedTime.getMinutes().toString().padStart(2, "0")}
        </Text>
      </View>
      <View style={styles.clockDiv}>
        {/* Outer Circle Numbers */}
        {outerClockNumbers.map((number, index) => {
          const angle = (index / 12) * 2 * Math.PI - Math.PI / 2; // -90 degrees to start from top
          const x = centerX + outerRadius * Math.cos(angle) - 10; // -10 to center the text
          const y = centerY + outerRadius * Math.sin(angle) - 10;

          return (
            <Text
              key={`outer-${number}`}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 20,
                height: 20,
                textAlign: "center",
              }}
            >
              {number}
            </Text>
          );
        })}

        {/* Inner Circle Numbers */}
        {innerClockNumbers.map((number, index) => {
          const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + innerRadius * Math.cos(angle) - 10;
          const y = centerY + innerRadius * Math.sin(angle) - 10;

          return (
            <Text
              key={`inner-${number}`}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 20,
                height: 20,
                textAlign: "center",
                fontSize: 12,
                color: "gray",
              }}
            >
              {number}
            </Text>
          );
        })}
      </View>
    </View>
  );
}
