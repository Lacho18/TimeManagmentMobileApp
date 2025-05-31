import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

//icons
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

import ColorThemeSelector from "../../components/ColorThemeSelector";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useStressTest } from "../../context/StressTestContext";
import StressTest from "../testStress/stressTest";
import MinRestTime from "../../components/Profile/MinRestTime";
import MaxTasks from "../../components/Profile/MaxTasks";
import PanicButton from "../../components/Profile/PanicButton";
import DayStartTime from "../../components/Profile/DayStartTime";

import { SafeAreaView } from "react-native-safe-area-context";
import { useMyFont } from "../../context/FontContext";
import SimpleViewSwitch from "../../components/Profile/SimpleViewSwitch";
import ProfileSimpleView from "../../components/Profile/ProfileSimpleView";

const { width } = Dimensions.get("window");

export default function Profile() {
  const { theme } = useTheme();
  const { user, logout, loading } = useUser();
  const { stressTest, startStressTest, endStressTest } = useStressTest();
  const { font } = useMyFont();

  console.log(user);

  //Follows whether to visualize the MinRestTime component which changes the min rest time
  const [minTimeRest, setMinTimeRest] = useState(false);

  //Follows whether to visualize the MaxTasks component which changes the daily max tasks
  const [maxTasks, setMaxTasks] = useState(false);

  //Follows whether to visualize the DayStartTime component which changes start of the day time
  const [startTime, setStartTime] = useState(false);

  //Checks if the data for user is loading or if the user is found. Does not return anything if so.
  if (loading || !user) return null;

  async function signOutHandler() {
    await logout();
    router.replace("/");
  }

  function closeWindows() {
    if (minTimeRest) {
      setMinTimeRest(false);
    }

    if (maxTasks) {
      setMaxTasks(false);
    }

    if (startTime) {
      setStartTime(false);
    }
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.background,
    },
    pressable: {
      flex: 1,
    },
    headerDiv: {
      display: "flex",
      flexDirection: "row",
      gap: 18,
      alignItems: "center",
      width: "100%",
      height: 40,
      paddingLeft: 20,
      paddingRight: 20,
      boxSizing: "border-box",
      backgroundColor: theme.primary,
      borderBottomWidth: 3,
      borderBottomColor: theme.secondary,
      width: "100%",
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: width / 2,
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
      fontFamily: font.bold,
    },
    buttonsDiv: {
      margin: 10,
      padding: 5,
      display: "flex",
      gap: 15,
    },
    buttonStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 20,
      paddingLeft: 5,
      paddingRight: 5,
    },
    buttonText: {
      color: theme.text,
      fontSize: 17,
      fontFamily: font.regular,
    },
  });

  return (
    <SafeAreaView style={styles.page}>
      <Pressable style={styles.pressable} onPress={closeWindows}>
        <View style={styles.headerDiv}>
          <Image style={styles.profileImage} source={{ uri: user.image }} />
          <Text style={styles.titleText}>{user.name}</Text>
        </View>
        <SimpleViewSwitch
          theme={theme}
          font={font}
          switchValue={user.preferences.simpleView}
          userId={user.id}
        />
        {user.preferences.simpleView ? (
          <ProfileSimpleView
            theme={theme}
            font={font}
            signOutHandler={signOutHandler}
            onMinRestTime={() => setMinTimeRest((oldValue) => !oldValue)}
            onMaxTasks={() => setMaxTasks((oldValue) => !oldValue)}
            onStartTime={() => setStartTime((oldValue) => !oldValue)}
            onLogsView={() => router.push("/logs/logsView")}
            onStressLevels={() => router.push("/home/stressGraph")}
          />
        ) : (
          <View style={styles.buttonsDiv}>
            <ColorThemeSelector
              buttonStyle={styles.buttonStyle}
              buttonText={styles.buttonText}
            />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={signOutHandler}
            >
              <Ionicons
                name="person-remove-sharp"
                size={28}
                color={theme.secondary}
              />
              <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                startStressTest();
              }}
            >
              <Ionicons name="newspaper" size={28} color={theme.secondary} />
              <Text style={styles.buttonText}>Make stress test</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setMinTimeRest((oldValue) => !oldValue);
              }}
            >
              <MaterialIcons name="restore" size={28} color={theme.secondary} />
              <Text style={styles.buttonText}>
                Set minimum rest time between tasks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setMaxTasks((oldValue) => !oldValue);
              }}
            >
              <FontAwesome5 name="tasks" size={28} color={theme.secondary} />
              <Text style={styles.buttonText}>
                Set max number of daily tasks
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                setStartTime((oldValue) => !oldValue);
              }}
            >
              <MaterialCommunityIcons
                name="calendar-start"
                size={28}
                color={theme.secondary}
              />
              <Text style={styles.buttonText}>Set start of the day</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                router.push("/logs/logsView");
              }}
            >
              <Feather name="activity" size={28} color={theme.secondary} />
              <Text style={styles.buttonText}>Activity logs</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                router.push("/home/stressGraph");
              }}
            >
              <Entypo name="area-graph" size={28} color={theme.secondary} />
              <Text style={styles.buttonText}>Stress levels graph</Text>
            </TouchableOpacity>
          </View>
        )}

        {stressTest && <StressTest />}
        {minTimeRest && (
          <MinRestTime
            theme={theme}
            font={font}
            currentMinTime={user.preferences.min_rest_time_between_tasks}
            userId={user.id}
            closeWindow={() => {
              setMinTimeRest(false);
            }}
          />
        )}
        {maxTasks && (
          <MaxTasks
            theme={theme}
            font={font}
            userCurrentMaxTasks={user.preferences.maxNumberOfTasks}
            userId={user.id}
            closeWindow={() => {
              setMaxTasks(false);
            }}
          />
        )}
        {startTime && (
          <DayStartTime
            theme={theme}
            font={font}
            userCurrentStartTime={user.preferences.dayStartTime}
            userId={user.id}
            closeWindow={() => setStartTime(false)}
          />
        )}

        <PanicButton
          theme={theme}
          font={font}
          userId={user.id}
          userStartTimeOfTheDay={user.preferences.dayStartTime}
          userMinRestTime={user.preferences.min_rest_time_between_tasks}
        />
      </Pressable>
    </SafeAreaView>
  );
}
