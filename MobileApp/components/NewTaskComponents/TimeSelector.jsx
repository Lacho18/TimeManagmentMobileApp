import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

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

  const outerRadius = 130;
  const innerRadius = 90;
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
      width: 350,
      height: 700,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateX: -0.5 * 350 }, { translateY: -0.5 * 700 }],
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
      textAlign: "center",
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
      width: 120,
      height: 50,
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

    timeButton: {
      width: 20,
      height: 20,
      backgroundColor: "green",
    },
  });

  return (
    <Modal transparent animationType="fade">
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
          <View
            style={[
              styles.clockDiv,
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            {[...outerClockNumbers, ...innerClockNumbers].map(
              (number, index) => {
                const isOuter = index < 12;
                const radius = isOuter ? outerRadius : innerRadius;
                const realIndex = isOuter ? index : index - 12;

                const angle = (realIndex / 12) * 2 * Math.PI - Math.PI / 2;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <View
                    key={number}
                    style={{
                      transform: [{ translateX: x }, { translateY: y }],
                      position: "absolute",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => setDateHour(number)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "transparent",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          color: theme.background,
                        }}
                      >
                        {number}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
          </View>
        )}

        {timeSelectionExpression.minutes && (
          <View
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {minutesNumbers.map((number, index) => {
              const angleDeg = (index / 60) * 360;
              const isLabel = number % 5 === 0;

              const radius = 140;

              const rotate = angleDeg;
              const translateY = -radius;

              return (
                <View
                  key={`minute-${number}`}
                  style={{
                    position: "absolute",
                    transform: [
                      { rotate: `${rotate}deg` },
                      { translateY },
                      { rotate: `${-rotate}deg` }, // unrotate children
                    ],
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setDateMinutes(number)}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: isLabel ? 30 : 10,
                      height: isLabel ? 30 : 10,
                    }}
                  >
                    {isLabel ? (
                      <Text
                        style={{
                          fontSize: 16,
                          color: theme.background,
                          textAlign: "center",
                        }}
                      >
                        {number}
                      </Text>
                    ) : (
                      <View
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.background,
                          opacity: 0.7,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
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
    </Modal>
  );
}
