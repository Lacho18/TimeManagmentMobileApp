import { View, Text, StyleSheet } from "react-native";
import { MONTHS, WEEK_DAYS_FULL_NAME } from "../../constants/DateConstants";

export default function DayOverviewView({ date, theme, isToday }) {
  console.log(date);
  const styles = StyleSheet.create({
    mainDiv: {
      padding: 7,
      borderTopWidth: 3,
      borderBottomWidth: 3,
      borderColor: theme.secondary,
    },
    headDiv: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    text: {
      fontSize: 20,
      color: theme.text,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View style={styles.headDiv}>
        <Text style={styles.text}>
          {date.getDate()} {MONTHS[date.getMonth()]}
        </Text>
        <Text style={styles.text}>.</Text>
        {isToday && <Text style={styles.text}>Today .</Text>}
        <Text style={styles.text}>{WEEK_DAYS_FULL_NAME[date.getDay()]}</Text>
      </View>
    </View>
  );
}
