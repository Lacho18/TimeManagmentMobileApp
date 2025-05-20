import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import SortButton from "./SortButton";
import { useEffect, useRef, useState } from "react";

import { router } from "expo-router";

import Feather from "@expo/vector-icons/Feather";

export default function MenuOptions({
  theme,
  topPosition,
  leftPosition,
  lastSelectedFilter,
  sortingTasksHandler,
}) {
  const COMPONENT_WIDTH = 230;
  const COMPONENT_HEIGHT = 310;

  const [menuVisible, setMenuVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setMenuVisible(true);
    openMenu();

    return () => {
      closeMenu();
    };
  }, []);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setMenuVisible(false));
  };

  const styles = StyleSheet.create({
    mainDiv: {
      width: COMPONENT_WIDTH,
      height: COMPONENT_HEIGHT,
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
    <Animated.View
      style={[
        styles.mainDiv,
        {
          transform: [
            { scale: scaleAnim },
            {
              translateX: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [COMPONENT_WIDTH, 0],
              }),
            },
            {
              translateY: scaleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-COMPONENT_HEIGHT, 0],
              }),
            },
          ],
          opacity: opacityAnim,
        },
      ]}
    >
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
        sortMethod={"date"}
        lastSelectedFilter={lastSelectedFilter}
        sortingTasksHandler={sortingTasksHandler}
      />
      <SortButton
        icon={<Ionicons name="flag-sharp" size={24} color={theme.secondary} />}
        theme={theme}
        buttonType={"priority"}
        sortMethod={"priority"}
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
        sortMethod={"stress level"}
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
        sortMethod={"duration"}
        lastSelectedFilter={lastSelectedFilter}
        sortingTasksHandler={sortingTasksHandler}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => router.push("/logs/logsView")}
      >
        <Feather name="activity" size={28} color={theme.secondary} />
        <Text style={styles.buttonText}>Activity logs</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
