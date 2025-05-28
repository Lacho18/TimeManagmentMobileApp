import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { createLog, deleteLog, getLogs } from "../../database/logsController";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import LogComponent from "../../components/LogsView/LogComponent";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LogsView() {
  const { theme } = useTheme();
  const { user } = useUser();

  if (!user) return;

  const [logs, setLogs] = useState([]);

  console.log(logs);

  useEffect(() => {
    async function getLogsUseEffect() {
      const response = await getLogs(user.id);

      if (response.length > 0) {
        setLogs(response);
      }
    }

    getLogsUseEffect();
  }, []);

  //Deletes the log
  function removeLogHandler(logId) {
    setLogs((oldValue) => oldValue.filter((log) => log.id !== logId));

    deleteLog(logId);
  }

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.background,
      paddingVertical: 10,
    },

    logsContainerStyle: {
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },

    title: {
      fontSize: 21,
      color: theme.text,
      fontWeight: "bold",
    },

    noLogsDiv: {
      justifyContent: "center",
      alignItems: "center",
    },

    noLogsText: {
      fontSize: 27,
      color: theme.text,
    },

    header: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 30,
      padding: 15,
    },

    viewsDiv: {
      display: "flex",
      width: "100%",
      gap: 15,
      alignSelf: "center",
      paddingTop: 30,
    },
  });

  if (logs.length == 0) {
    return (
      <View style={[styles.page, styles.noLogsDiv]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={28} color={theme.secondary} />
        </TouchableOpacity>
        <Text style={styles.noLogsText}>No logs found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView contentContainerStyle={styles.logsContainerStyle}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={theme.secondary} />
          </TouchableOpacity>
          <View style={{ width: "100%" }}>
            <Text style={styles.title}>Activity logs</Text>
          </View>
        </View>

        <View style={styles.viewsDiv}>
          {logs.map((log) => (
            <LogComponent
              key={log.id}
              log={log}
              theme={theme}
              user={user}
              removeLog={removeLogHandler}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
