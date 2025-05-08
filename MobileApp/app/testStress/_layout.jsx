import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import { StressTestProvider } from "../../context/StressTestContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StressTestProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </StressTestProvider>
    </ThemeProvider>
  );
}
