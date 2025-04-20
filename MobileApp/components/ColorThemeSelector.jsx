import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function ColorThemeSelector({ buttonStyle, buttonText }) {
  const { theme, colorThemes } = useTheme();
  const [themes, setThemes] = useState(false);

  console.log(themes);
  console.log(Object.keys(colorThemes));

  const styles = StyleSheet.create({
    colorsDiv: {
      display: "flex",
      flexDirection: "row",
      paddingLeft: 10,
      marginTop: 10,
      gap: 10,
    },

    colorPickerButton: {
      width: 25,
      height: 25,
      borderWidth: 1,
      padding: 3,
    },
  });

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
        <View style={styles.colorsDiv}>
          {Object.keys(colorThemes).map((arrayTheme) => (
            <TouchableOpacity
              key={arrayTheme}
              style={{
                ...styles.colorPickerButton,
                backgroundColor: colorThemes[arrayTheme].primary,
              }}
            ></TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
