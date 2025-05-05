import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import OverViewHeader from "../../components/Overview/OverViewHeader";
import { useRef } from "react";
import { DAYS_AHEAD_OVERVIEW_VIEW } from "../../constants/DateConstants";
import { getGivenNumberOfDays } from "../../utils/dateUtil";
import DayOverviewView from "../../components/Overview/DayOverviewView";

export default function Overview() {
  const { theme } = useTheme();
  const daysAhead = useRef(getGivenNumberOfDays(DAYS_AHEAD_OVERVIEW_VIEW));

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: theme.background,
      padding: 10,
      gap: 15,
      position: "relative",
    },

    header: {
      display: "flex",
      gap: 20,
      width: "100%",
    },

    title: {
      fontSize: 30,
      color: theme.text,
      fontWeight: "bold",
    },

    scrollView: {
      display: "flex",
      width: "100%",
    },
  });

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Upcoming</Text>

        <OverViewHeader theme={theme} />
      </View>
      <ScrollView
        vertical
        contentContainerStyle={{ gap: 15 }}
        style={styles.scrollView}
      >
        {daysAhead.current.map((date) => (
          <DayOverviewView date={date} />
        ))}
      </ScrollView>
    </View>
  );
}
