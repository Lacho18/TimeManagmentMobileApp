import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useStressTest } from "../../context/StressTestContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import ColorThemeSelector from "../ColorThemeSelector";

const ICONS_SIZE = 44;

export default function ProfileSimpleView({
  theme,
  font,
  signOutHandler,
  onTestSelect,
  onMinRestTime,
  onMaxTasks,
  onStartTime,
  onLogsView,
  onStressLevels,
}) {
  const { startStressTest } = useStressTest();

  const styles = StyleSheet.create({
    buttonsDiv: {
      margin: 10,
      padding: 5,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 15,
    },

    singleButton: {
      flexBasis: "30%",
      height: 120,
      borderWidth: 3,
      borderColor: theme.primary,
      borderRadius: 18,
      padding: 15,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },

    buttonText: {
      fontSize: 21,
      color: theme.text,
      fontFamily: font.bold,
    },
  });

  return (
    <View style={styles.buttonsDiv}>
      <TouchableOpacity style={styles.singleButton}>
        <MaterialIcons
          name="color-lens"
          size={ICONS_SIZE}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={signOutHandler}>
        <Ionicons
          name="person-remove-sharp"
          size={ICONS_SIZE}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onTestSelect}>
        <FontAwesome name="wpforms" size={ICONS_SIZE} color={theme.secondary} />
        <Text style={styles.buttonText}>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onMinRestTime}>
        <MaterialIcons name="restore" size={44} color={theme.secondary} />
        <Text style={styles.buttonText}>Rest</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onMaxTasks}>
        <FontAwesome5 name="tasks" size={ICONS_SIZE} color={theme.secondary} />
        <Text style={styles.buttonText}>Max task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onStartTime}>
        <MaterialCommunityIcons
          name="calendar-start"
          size={ICONS_SIZE}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Day start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onLogsView}>
        <Feather name="activity" size={ICONS_SIZE} color={theme.secondary} />
        <Text style={styles.buttonText}>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onStressLevels}>
        <Entypo name="area-graph" size={ICONS_SIZE} color={theme.secondary} />
        <Text style={styles.buttonText}>Stress lv.</Text>
      </TouchableOpacity>
    </View>
  );
}
