import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { useStressTest } from "../../context/StressTestContext";
import ColorThemeSelector from "../ColorThemeSelector";

export default function ProfileSimpleView({
  theme,
  font,
  signOutHandler,
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
      borderWidth: 5,
      borderColor: theme.primary,
      borderRadius: 18,
      padding: 15,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },

    buttonText: {
      fontSize: 16,
      color: theme.text,
      fontFamily: font.bold,
    },
  });

  return (
    <View style={styles.buttonsDiv}>
      <TouchableOpacity style={styles.singleButton}>
        <MaterialIcons name="color-lens" size={42} color={theme.secondary} />
        <Text style={styles.buttonText}>Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={signOutHandler}>
        <Ionicons
          name="person-remove-sharp"
          size={42}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={startStressTest}>
        <Ionicons name="newspaper" size={42} color={theme.secondary} />
        <Text style={styles.buttonText}>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onMinRestTime}>
        <MaterialIcons name="restore" size={42} color={theme.secondary} />
        <Text style={styles.buttonText}>Rest time</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onMaxTasks}>
        <FontAwesome5 name="tasks" size={42} color={theme.secondary} />
        <Text style={styles.buttonText}>Max task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onStartTime}>
        <MaterialCommunityIcons
          name="calendar-start"
          size={42}
          color={theme.secondary}
        />
        <Text style={styles.buttonText}>Day start</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onLogsView}>
        <Feather name="activity" size={42} color={theme.secondary} />
        <Text style={styles.buttonText}>Activity</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.singleButton} onPress={onStressLevels}>
        <Entypo name="area-graph" size={42} color={theme.secondary} />
        <Text style={styles.buttonText}>Stress lv.</Text>
      </TouchableOpacity>
    </View>
  );
}
