// components/TrendChart.js
import { useTheme } from "../../context/ThemeContext";
import React from "react";
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMyFont } from "../../context/FontContext";
import { formatDateMonthName, formatHoursFromDate } from "../../utils/dateUtil";

const screenWidth = Dimensions.get("window").width;

export default function StressGraph() {
  const { theme } = useTheme();
  const { font } = useMyFont();
  const data = [];
  const today = new Date();

  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    data.unshift({
      date: date,
      value: Math.floor(Math.random() * 10) + 1,
    });
  }

  const chartData = {
    labels: data.map((item) => formatDateMonthName(item.date, false, true)),
    datasets: [
      {
        data: data.map((item) => item.value),
      },
    ],
  };

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
  });

  return (
    <SafeAreaView style={styles.page}>
      <Text style={styles.title}>Stress levels</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 20}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => theme.primary,
          labelColor: (opacity = 1) => theme.text,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: theme.primary,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </SafeAreaView>
  );
}
