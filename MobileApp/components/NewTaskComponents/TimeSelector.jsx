import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TimeSelector({
  theme,
  dateType,
  currentSelectionOfDate,
  onTimeSelect,
}) {
  const [selectedTime, setSelectedTime] = useState(currentSelectionOfDate);
  const [timeSelectionExpression, setTimeSelectionExpression] = useState({
    hours: true,
    minutes: false,
  });

  console.log(dateType);
  console.log(currentSelectionOfDate);

  const outerClockNumbers = Array.from({ length: 12 }, (_, i) => i);
  const innerClockNumbers = Array.from({ length: 12 }, (_, i) => i + 12);
  const minutesNumbers = Array.from({ length: 60 }, (_, i) => i);

  const outerRadius = 120;
  const innerRadius = 80;
  const centerX = 150;
  const centerY = 150;

  function setDateHour(value) {
    setSelectedTime((oldValue) => {
      let newValue = new Date(oldValue);
      newValue.setHours(value);

      return newValue;
    });

    setTimeSelectionExpression(() => {
      return { hours: false, minutes: true };
    });
  }

  function setDateMinutes(value) {
    setSelectedTime((oldValue) => {
      let newValue = new Date(oldValue);
      newValue.setMinutes(value);

      return newValue;
    });

    setTimeSelectionExpression(() => {
      return { hours: true, minutes: false };
    });
  }

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
      height: "70%",
      position: "relative",
    },

    setButton: {
      backgroundColor: theme.highlight,
      width: 100,
      height: 40,
      borderColor: theme.background,
      borderWidth: 4,
      padding: 10,
      borderRadius: 7,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    setButtonText: {
      fontSize: 18,
      color: theme.text,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View style={styles.titleDiv}>
        <TouchableOpacity
          onPress={() => {
            setTimeSelectionExpression(() => {
              return { hours: true, minutes: false };
            });
          }}
        >
          <Text style={styles.titleNumbers}>
            {selectedTime.getHours().toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>
        <Text style={styles.symbol}>:</Text>
        <TouchableOpacity
          onPress={() => {
            setTimeSelectionExpression(() => {
              return { hours: false, minutes: true };
            });
          }}
        >
          <Text style={styles.titleNumbers}>
            {selectedTime.getMinutes().toString().padStart(2, "0")}
          </Text>
        </TouchableOpacity>
      </View>
      {timeSelectionExpression.hours && (
        <View style={styles.clockDiv}>
          {outerClockNumbers.map((number, index) => {
            const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + outerRadius * Math.cos(angle) - 10;
            const y = centerY + outerRadius * Math.sin(angle) - 10;

            return (
              <TouchableOpacity
                key={`outer-${number}`}
                onPress={() => {
                  setDateHour(number);
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: 20,
                    height: 20,
                    textAlign: "center",
                    fontSize: 18,
                    color: theme.background,
                  }}
                >
                  {number}
                </Text>
              </TouchableOpacity>
            );
          })}

          {innerClockNumbers.map((number, index) => {
            const angle = (index / 12) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + innerRadius * Math.cos(angle) - 10;
            const y = centerY + innerRadius * Math.sin(angle) - 10;

            return (
              <TouchableOpacity
                key={`inner-${number}`}
                onPress={() => {
                  setDateHour(number);
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: 20,
                    height: 20,
                    textAlign: "center",
                    fontSize: 18,
                    color: theme.background,
                  }}
                >
                  {number}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {timeSelectionExpression.minutes && (
        <View style={styles.clockDiv}>
          {minutesNumbers.map((number, index) => {
            const angle = (index / 60) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + outerRadius * Math.cos(angle) - 10;
            const y = centerY + outerRadius * Math.sin(angle) - 10;

            const divideByFive = number % 5 === 0;

            return (
              <TouchableOpacity
                key={`outer-${number}`}
                onPress={() => {
                  setDateMinutes(number);
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: divideByFive ? 24 : 20,
                    height: divideByFive ? 24 : 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {divideByFive ? (
                    <Text
                      style={{
                        fontSize: 18,
                        color: theme.background,
                        textAlign: "center",
                      }}
                    >
                      {number}
                    </Text>
                  ) : (
                    <View
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: theme.background,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View>
        <TouchableOpacity
          style={styles.setButton}
          onPress={() => {
            onTimeSelect(dateType, selectedTime);
          }}
        >
          <Text style={styles.setButtonText}>Set time</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
