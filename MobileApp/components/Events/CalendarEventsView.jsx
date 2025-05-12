import { StyleSheet, Text, View } from "react-native";

/*
    Ideqta e za meseca da se vishda kato v tradicionen kalendar kato ako ima dni sus subitie te shte svetqt v dryg cvqt i mslko ksto se scrolne shte pishe datata i subitiqta
*/

export default function CalendarEventsView({ events, theme }) {
  const styles = StyleSheet.create({
    mainDiv: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -75%)",
      width: "100%",
      height: 400,
      backgroundColor: theme.primary,
      zIndex: 100,
    },
  });

  return (
    <View style={styles.mainDiv}>
      <Text>123</Text>
    </View>
  );
}
