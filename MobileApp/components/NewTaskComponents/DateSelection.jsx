import { useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import CalendarView from "./CalendarView";

const screenHeight = Dimensions.get("window").height;

/*
    Napravi go kato v ToDoIst
    Dobavi i buton za zatvarqneto na DateSelection
    Dobavi button za Tommorow i tyka kakto i next week
    Napravi go cato calendar
    Chasut shte e ot otdelno pole kakto i produljitelnostta
*/

export default function DateSelection({
  theme,
  visible,
  closeButtonStyle,
  onDateSelect,
  onClose,
}) {
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : screenHeight,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "100%",
      zIndex: 120,
    },
    panel: {
      flex: 1,
      backgroundColor: theme.secondary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 10,
      display: "flex",
      flexDirection: "column",
      padding: 20,
      gap: 20,
    },
    title: {
      fontSize: 25,
      fontWeight: "bold",
      color: theme.background,
    },
    fastOptionsDiv: {
      display: "flex",
      gap: 15,
    },
    fastButtonStyle: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      padding: 5,
      alignItems: "center",
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: theme.background,
    },
    fastButtonText: {
      fontSize: 15,
      color: theme.background,
    },
  });
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      <ScrollView
        vertical
        contentContainerStyle={{ gap: 15 }}
        style={styles.panel}
      >
        <TouchableOpacity style={closeButtonStyle} onPress={onClose}>
          <Fontisto name="close-a" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Date</Text>
        <View style={styles.fastOptionsDiv}>
          <TouchableOpacity style={styles.fastButtonStyle}>
            <MaterialIcons name="today" size={28} color={theme.accent} />
            <Text style={styles.fastButtonText}>Tomorrow</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fastButtonStyle}>
            <MaterialCommunityIcons
              name="calendar-weekend"
              size={28}
              color={theme.accent}
            />
            <Text style={styles.fastButtonText}>This weekend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.fastButtonStyle}>
            <Feather name="calendar" size={28} color={theme.accent} />
            <Text style={styles.fastButtonText}>Next week</Text>
          </TouchableOpacity>
        </View>
        <View>
          <CalendarView
            monthsAhead={12}
            theme={theme}
            onDateSelect={onDateSelect}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
}
