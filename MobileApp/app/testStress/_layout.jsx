import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import { StressTestProvider } from "../../context/StressTestContext";
import { FontProvider } from "../../context/FontContext";
import { UserProvider } from "../../context/UserContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StressTestProvider>
        <FontProvider>
          <UserProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </UserProvider>
        </FontProvider>
      </StressTestProvider>
    </ThemeProvider>
  );
}
