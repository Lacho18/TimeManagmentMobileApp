import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

export default function ColorThemeSelector({
  buttonStyle,
  buttonText,
  userSimpleView,
}) {
  const { theme, toggleTheme, colorThemes } = useTheme();
  const [themes, setThemes] = useState(false);

  //Function that changes the theme color from the provider
  function changeThemeColorHandler(selectedTheme) {
    toggleTheme(selectedTheme);
    //Hides the pop up for the color themes
    setThemes(false);
  }

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

    singleButton: {
      flexBasis: "30%",
      height: 120,
      borderWidth: 5,
      borderColor: theme.primary,
      borderRadius: 18,
      padding: 15,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },

    buttonText: {
      fontSize: 16,
      color: theme.text,
    },
  });

  return (
    <ScrollView horizontal>
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
              onPress={() => {
                changeThemeColorHandler(arrayTheme);
              }}
            ></TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
