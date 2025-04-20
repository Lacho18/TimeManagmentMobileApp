import { Image, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { GLOBAL_STYLES } from "@/constants/PageStyle";
import { useUser } from "../../context/UserContext";

export default function Profile() {
  const { theme } = useTheme();
  const { user } = useUser();

  console.log("Q puk stane");
  console.log(user);

  return (
    <View style={{ ...GLOBAL_STYLES.page, backgroundColor: theme.background }}>
      <View>
        <Image />
        <Text></Text>
      </View>
      <Text>Profile</Text>
    </View>
  );
}
