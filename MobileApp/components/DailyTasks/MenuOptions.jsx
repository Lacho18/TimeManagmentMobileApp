import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

/*
    Napravi go da se poqvqva s animaciq
    Napravi sortiraniqta v dailyTasks
    Dobavi activity logs
*/

export default function MenuOptions({
  theme,
  topPosition,
  leftPosition,
  lastSelectedFilter,
  sortingTasksHandler,
}) {
  const COMPONENT_WIDTH = 230;

  const styles = StyleSheet.create({
    mainDiv: {
      width: COMPONENT_WIDTH,
      height: "auto",
      backgroundColor: theme.primary,
      borderRadius: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      position: "absolute",
      top: topPosition,
      left: leftPosition - COMPONENT_WIDTH,
      zIndex: 50,
      padding: 15,
    },
    buttonStyle: {
      width: "95%",
      height: 50,
      borderWidth: 3,
      borderColor: theme.secondary,
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 7,
    },
    buttonText: {
      fontSize: 16,
      color: theme.text,
    },
  });

  console.log(lastSelectedFilter);

  return (
    <View style={styles.mainDiv}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          sortingTasksHandler("startTime");
        }}
      >
        <MaterialIcons
          name="access-time-filled"
          size={24}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Sort by time </Text>
        {lastSelectedFilter.type === "startTime" ? (
          <AntDesign
            name="caretup"
            size={24}
            color={theme.background}
            style={{ alignSelf: "flex-end" }}
          />
        ) : (
          <AntDesign
            name="caretdown"
            size={24}
            color={theme.background}
            style={{ alignSelf: "flex-end" }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          sortingTasksHandler("priority");
        }}
      >
        <Ionicons name="flag-sharp" size={24} color={theme.secondary} />
        <Text style={styles.buttonText}>Sort by priority</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          sortingTasksHandler("stressLevel");
        }}
      >
        <MaterialCommunityIcons
          name="gauge"
          size={24}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Sort by stress level</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          sortingTasksHandler("duration");
        }}
      >
        <FontAwesome6 name="hourglass-end" size={24} color={theme.secondary} />
        <Text style={styles.buttonText}>Sort by duration</Text>
      </TouchableOpacity>
    </View>
  );
}
