import { View, Text, StyleSheet } from "react-native";
import { MONTHS, WEEK_DAYS_FULL_NAME } from "../../constants/DateConstants";

export default function DayOverviewView({ date }) {
  console.log(date.getDate() + "" + MONTHS[date.getMonth()]);

  const styles = StyleSheet.create({
    headDiv: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
  });

  return (
    <View>
      <View style={styles.headDiv}>
        <Text>
          {date.getDate()} {MONTHS[date.getMonth()]}
        </Text>
        <Text>.</Text>
        <Text>{WEEK_DAYS_FULL_NAME[date.getDay()]}</Text>
      </View>
    </View>
  );
}
