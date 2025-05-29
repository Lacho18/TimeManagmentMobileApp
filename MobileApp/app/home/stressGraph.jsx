// components/TrendChart.js
import { useTheme } from "../../context/ThemeContext";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyFont } from "../../context/FontContext";
import { formatDateMonthName, formatHoursFromDate } from "../../utils/dateUtil";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;

export default function StressGraph() {
  const { theme } = useTheme();
  const { font } = useMyFont();
  const stressLevelsData = useRef([]);

  const [visualData, setVisualData] = useState(null);
  const [onlyPastMonth, setOnlyPastMonth] = useState(false);

  useEffect(() => {
    const dataCopy = [];
    const today = new Date();

    const values = [
      2, 2, 3, 2, 2, 1, 1, 5, 5, 7, 7, 7, 7, 7, 7, 8, 6, 6, 3, 1, 1, 1, 1, 2, 2,
      2, 2, 2, 2, 2, 2, 2, 9, 9, 9, 8, 9, 10, 7, 6, 4, 3, 3, 3, 3, 4,
    ];

    const dataLength = onlyPastMonth ? 30 : values.length;

    for (let i = 0; i < dataLength; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      dataCopy.unshift({
        date: date,
        value: values[i],
      });
    }

    const chartData = {
      labels:
        dataCopy.length > 10
          ? dataCopy.map(() => "")
          : dataCopy.map((item) => formatDateMonthName(item.date, false, true)),
      datasets: [
        {
          data: dataCopy.map((item) => item.value),
        },
      ],
    };

    setVisualData(chartData);
  }, [onlyPastMonth]);

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 30,
      color: theme.text,
      fontFamily: font.bold,
    },
    buttonStyle: {
      padding: 10,
      borderWidth: 3,
      borderColor: theme.primary,
      borderRadius: 10,
      backgroundColor: theme.secondary,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    backButton: {
      position: "absolute",
      top: 0,
      left: 0,
      margin: 20,
      border: "none",
    },
  });

  if (visualData === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log(visualData?.datasets[0].data.length);

  return (
    <SafeAreaView style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={32} color={theme.secondary} />
      </TouchableOpacity>
      <Text style={styles.title}>Stress levels</Text>
      <LineChart
        data={visualData}
        width={screenWidth - 20}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: theme.secondary,
          backgroundGradientTo: theme.secondary,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.primary,
          labelColor: (opacity = 1) => theme.text,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: theme.primary,
          },
          propsForBackgroundLines: {
            stroke: "transparent",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      {visualData?.datasets[0].data.length >= 30 && (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setOnlyPastMonth((oldValue) => !oldValue);
          }}
        >
          <Text>
            {onlyPastMonth ? "View all data" : "View only past month"}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
