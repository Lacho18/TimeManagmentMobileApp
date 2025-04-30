import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import "../utils/dateUtil";

export default function RootLayout() {
  return (

    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  )
}
