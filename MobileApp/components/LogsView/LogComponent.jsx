import { Image, StyleSheet, Text, View } from "react-native";
import { formatDateMonthName, formatHoursFromDate } from "../../utils/dateUtil";

export default function LogComponent({ log, theme, user }) {
  console.log(log.createdAt);
  const styles = StyleSheet.create({
    mainDiv: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: 80,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.secondary,
    },

    imageDiv: {
      flexBasis: "20%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    contextDiv: {
      flexBasis: "80%",
      display: "flex",
      gap: 10,
    },

    userImage: {
      width: 50,
      height: 50,
      borderRadius: "50%",
    },
  });

  return (
    <View style={styles.mainDiv}>
      <View style={styles.imageDiv}>
        <Image style={styles.userImage} source={{ uri: user.image }} />
      </View>
      <View style={styles.contextDiv}>
        <Text>{log.message}</Text>
        <Text>{formatHoursFromDate(log.createdAt)}</Text>
      </View>
    </View>
  );
}
