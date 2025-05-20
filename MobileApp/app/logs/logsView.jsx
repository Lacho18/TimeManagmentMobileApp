import { Text, View } from "react-native";
import { useUser } from "../../context/UserContext";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getLogs } from "../../database/logsController";

export default function LogsView() {
  const { theme } = useTheme();
  const { user } = useUser();

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function getLogsUseEffect() {
      const response = await getLogs(user.id);

      if (response.length > 0) {
        setLogs(response);
      }
    }

    getLogsUseEffect();
  }, []);

  if (logs.length == 0) {
    return (
      <View>
        <Text>No logs found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>123</Text>
    </View>
  );
}
