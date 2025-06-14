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
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import CalendarView from "./CalendarView";

const screenHeight = Dimensions.get("window").height;

export default function DateSelection({
  theme,
  visible,
  dateType,
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

  //Function that handles the tomorrow button click
  function handleTomorrowSelect() {
    let now = new Date();
    let featureDate = new Date(now);
    featureDate.setDate(now.getDate() + 1);

    onDateSelect(dateType, featureDate);
  }

  //Function that selects the closest saturday
  function fastButtonsHandler(newWeek) {
    //Today date
    const today = new Date();

    //Returns the number of the day in the week. Wednesday = 3
    const dayOfWeek = today.getDay();

    //Calculates the days until if newWeek until Monday and if not until the weekend
    const daysUntil = ((newWeek ? 1 : 6) - dayOfWeek + 7) % 7; // if today is Saturday 0 days

    const result = new Date(today);
    result.setDate(today.getDate() + daysUntil);

    onDateSelect(dateType, result);
  }

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
      backgroundColor: theme.background,
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
      color: theme.text,
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
          <Fontisto name="close-a" size={20} color={theme.secondary} />
        </TouchableOpacity>
        <Text style={styles.title}>Date</Text>
        <View style={styles.fastOptionsDiv}>
          <TouchableOpacity
            style={styles.fastButtonStyle}
            onPress={() => {
              handleTomorrowSelect();
            }}
          >
            <MaterialIcons name="today" size={28} color={theme.secondary} />
            <Text style={styles.fastButtonText}>Tomorrow</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fastButtonStyle}
            onPress={() => {
              fastButtonsHandler(false);
            }}
          >
            <MaterialCommunityIcons
              name="calendar-weekend"
              size={28}
              color={theme.secondary}
            />
            <Text style={styles.fastButtonText}>This weekend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fastButtonStyle}
            onPress={() => {
              fastButtonsHandler(true);
            }}
          >
            <Feather name="calendar" size={28} color={theme.secondary} />
            <Text style={styles.fastButtonText}>Next week</Text>
          </TouchableOpacity>
        </View>
        <View>
          <CalendarView
            monthsAhead={12}
            theme={theme}
            dateType={dateType}
            onDateSelect={onDateSelect}
          />
        </View>
      </ScrollView>
    </Animated.View>
  );
}
