import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

//icons
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import ColorThemeSelector from "../../components/ColorThemeSelector";

export default function Profile() {
  const { theme } = useTheme();
  const { user, logout, loading } = useUser();

  if (loading) return;

  console.log("Q puk stane");
  console.log(user.image);

  const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
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
    },
    profileImage: {
      width: 30,
      height: 30,
      borderRadius: "50%",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.text,
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
    },
  });

  return (
    <View style={{ ...styles.page, backgroundColor: theme.background }}>
      <View style={styles.headerDiv}>
        <Image style={styles.profileImage} source={{ uri: user.image }} />
        <Text style={styles.titleText}>{user.name}</Text>
      </View>
      <View style={styles.buttonsDiv}>
        {/*<TouchableOpacity style={styles.buttonStyle}>
          <MaterialIcons name="color-lens" size={28} color={theme.secondary} />
          <Text style={styles.buttonText}>Color theme</Text>
        </TouchableOpacity>*/}
        <ColorThemeSelector
          buttonStyle={styles.buttonStyle}
          buttonText={styles.buttonText}
        />
        <TouchableOpacity style={styles.buttonStyle}>
          <Ionicons
            name="person-remove-sharp"
            size={28}
            color={theme.secondary}
          />
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <Text>Profile</Text>
    </View>
  );
}
