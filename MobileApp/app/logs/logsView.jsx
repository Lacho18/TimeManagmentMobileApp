import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../../context/UserContext";
import { useTheme } from "../../context/ThemeContext";
import { useEffect, useState } from "react";
import { getLogs } from "../../database/logsController";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

export default function LogsView() {
  const { theme } = useTheme();
  const { user } = useUser();

  if (!user) return;

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function getLogsUseEffect() {
      const response = await getLogs(user.id);

      if (response.length > 0) {
        setLogs(response);
      }
    }

    //getLogsUseEffect();

    setLogs(
      Array.from({ length: 20 }, (_, i) => ({
        userId: `user_${i + 1}`,
        message: `Log message ${i + 1}`,
        createdAt: new Date(Date.now() - i * 3600 * 1000).toISOString(),
      }))
    );
  }, []);

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: theme.background,
    },

    title: {
      fontSize: 30,
      color: theme.text,
      fontWeight: "bold",
      textAlign: "center",
    },

    noLogsDiv: {
      justifyContent: "center",
      alignItems: "center",
    },

    noLogsText: {
      fontSize: 27,
      color: theme.text,
    },

    backButton: {
      position: "absolute",
      top: 0,
      left: 0,
      padding: 15,
      borderRightWidth: 3,
      borderBottomWidth: 3,
      borderRadius: 18,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
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
    <View style={styles.page}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={theme.secondary} />
      </TouchableOpacity>
      <Text style={styles.title}>Activity logs</Text>
      {logs.map((log) => (
        <Text>Log</Text>
      ))}
    </View>
  );
}
