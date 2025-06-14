import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";

//Icons
import Daily from "@expo/vector-icons/AntDesign";
import Events from "@expo/vector-icons/MaterialIcons";
import Calendar from "@expo/vector-icons/AntDesign";
import Profile from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useRouter } from "expo-router";

export default function Navigation() {
  const { theme } = useTheme();
  if (!theme) return;
  const router = useRouter();

  const styles = StyleSheet.create({
    navigation: {
      height: 70,
      backgroundColor: theme.primary,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      zIndex: 5,
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
    navButtonView: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
        <View style={styles.navButtonView}>
          <Daily name="home" size={34} color={theme.secondary} />
          <Text style={styles.navButtonText}>Daily</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/overview");
        }}
      >
        <View style={styles.navButtonView}>
          <Calendar name="calendar" size={34} color={theme.secondary} />
          <Text style={styles.navButtonText}>Upcoming</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/events");
        }}
      >
        <View style={styles.navButtonView}>
          <Events name="event" size={34} color={theme.secondary} />
          <Text style={styles.navButtonText}>Events</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/breathing/false");
        }}
      >
        <View style={styles.navButtonView}>
          <FontAwesome6
            name="person-circle-plus"
            size={34}
            color={theme.secondary}
          />
          <Text style={styles.navButtonText}>Breathing</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => {
          router.push("/home/profile");
        }}
      >
        <View style={styles.navButtonView}>
          <Profile name="account-box" size={34} color={theme.secondary} />
          <Text style={styles.navButtonText}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
