import { Stack } from "expo-router";
import { ThemeProvider } from "../../context/ThemeContext";
import { StressTestProvider } from "../../context/StressTestContext";
import { FontProvider } from "../../context/FontContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StressTestProvider>
        <FontProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </FontProvider>
      </StressTestProvider>
    </ThemeProvider>
  );
}
