import { View, TouchableOpacity, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function ColorThemeSelector({ buttonStyle, buttonText }) {
  const { theme, colorThemes } = useTheme();
  const [themes, setThemes] = useState(false);

  console.log(colorThemes);

  return (
    <View>
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => setThemes((oldValue) => !oldValue)}
      >
        <MaterialIcons name="color-lens" size={28} color={theme.secondary} />
        <Text style={buttonText}>Color theme</Text>
      </TouchableOpacity>
      {themes && (
        <View>
          {colorThemes.map((arrayTheme) => (
            <TouchableOpacity
              style={{ backgroundColor: arrayTheme.primary }}
            ></TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
