import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const { theme } = useTheme();
  const { user } = useUser();

  console.log("Q puk stane");
  console.log(user.image);

  return (
    <View style={{ ...styles.page, backgroundColor: theme.background }}>
      <View style={styles.headerDiv}>
        <Image style={styles.profileImage} source={{ uri: user.image }} />
        <Text>{user.name}</Text>
      </View>
      <Text>Profile</Text>
    </View>
  );
}

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
    backgroundColor: "green",
  },

  profileImage: {
    width: 30,
    height: 30,
    borderRadius: "50%",
  },
});
