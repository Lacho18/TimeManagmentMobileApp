import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SortButton from "./SortButton";

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
      <SortButton
        icon={
          <MaterialIcons
            name="access-time-filled"
            size={24}
            color={theme.secondary}
          />
        }
        theme={theme}
        buttonType={"startTime"}
        lastSelectedFilter={lastSelectedFilter}
        sortingTasksHandler={sortingTasksHandler}
      />
      <SortButton
        icon={<Ionicons name="flag-sharp" size={24} color={theme.secondary} />}
        theme={theme}
        buttonType={"priority"}
        lastSelectedFilter={lastSelectedFilter}
        sortingTasksHandler={sortingTasksHandler}
      />
      <SortButton
        icon={
          <MaterialCommunityIcons
            name="gauge"
            size={24}
            color={theme.secondary}
          />
        }
        theme={theme}
        buttonType={"stressLevel"}
        lastSelectedFilter={lastSelectedFilter}
        sortingTasksHandler={sortingTasksHandler}
      />
      <SortButton
        icon={
          <FontAwesome6
            name="hourglass-end"
            size={24}
            color={theme.secondary}
          />
        }
        theme={theme}
        buttonType={"duration"}
        lastSelectedFilter={lastSelectedFilter}
        sortingTasksHandler={sortingTasksHandler}
      />
    </View>
  );
}
