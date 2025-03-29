import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

//Icons
import Daily from "@expo/vector-icons/AntDesign";
import Events from "@expo/vector-icons/MaterialIcons";
import Calendar from "@expo/vector-icons/AntDesign";
import Profile from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export default function Navigation() {
  const { theme } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    navigation: {
      height: 70,
      backgroundColor: theme.primary,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    navButton: {
      width: "20%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    navButtonText: {
      fontSize: 14,
      color: theme.text,
      fontWeight: "bold",
      textAlign: "center",
    },
  });

  return (
    <View style={styles.navigation}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/dailyTasks");
        }}
      >
        <View>
          <Daily name="home" size={34} color="black" />
          <Text style={styles.navButtonText}>Daily</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/events");
        }}
      >
        <View>
          <Events name="event" size={34} color="black" />
          <Text style={styles.navButtonText}>Events</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/overview");
        }}
      >
        <View>
          <Calendar name="calendar" size={34} color="black" />
          <Text style={styles.navButtonText}>View</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/dailyTasks");
        }}
      >
        <View>
          <Profile name="account-box" size={34} color="black" />
          <Text style={styles.navButtonText}>Daily</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
