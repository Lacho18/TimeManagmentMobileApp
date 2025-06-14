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
      20, 20, 30, 20, 20, 10, 10, 50, 50, 70, 70, 70, 70, 70, 70, 80, 60, 60,
      30, 10, 10, 10, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20, 90, 90, 90, 80,
      90, 100, 70, 60, 40, 30, 30, 30, 30, 40,
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
      padding: 15,
      borderWidth: 2,
      borderColor: theme.highlight,
      borderRadius: 10,
      backgroundColor: theme.accent,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 15,
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
        yAxisInterval={10}
        chartConfig={{
          backgroundGradientFrom: theme.secondary,
          backgroundGradientTo: theme.secondary,
          decimalPlaces: 0,
          color: (opacity = 1) => theme.highlight,
          labelColor: (opacity = 1) => theme.text,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "2",
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
          backgroundColor: theme.primary,
        }}
      />
      {visualData?.datasets[0].data.length >= 30 && (
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setOnlyPastMonth((oldValue) => !oldValue);
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme.text,
              fontFamily: font.regular,
            }}
          >
            {onlyPastMonth ? "View all data" : "View only past month"}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
