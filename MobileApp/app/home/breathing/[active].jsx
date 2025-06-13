import { Text, View, Platform } from "react-native";
import { useTheme } from "../../../context/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import BreathingMainComponent from "../../../components/Breathing/BreathingPage";

export default function Breathing() {
  const { theme } = useTheme();
  const { active } = useLocalSearchParams();

  return <BreathingMainComponent theme={theme} active={active} />;
}
