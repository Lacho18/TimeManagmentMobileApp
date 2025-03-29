import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import Navigation from "./navigation";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>

      <Navigation />
    </ThemeProvider>
  );
}
