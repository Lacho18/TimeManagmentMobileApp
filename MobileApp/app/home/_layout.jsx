import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import Navigation from "./navigation";
import { UserProvider } from "../../context/UserContext";
import AddTask from "../../components/AddTask";

export default function RootLayout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}></Stack>

        <AddTask />
        <Navigation />
      </ThemeProvider>
    </UserProvider>
  );
}
