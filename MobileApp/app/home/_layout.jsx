import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import Navigation from "./navigation";
import { UserProvider } from "../../context/UserContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}></Stack>

        <Navigation />
      </ThemeProvider>
    </UserProvider>
  );
}
