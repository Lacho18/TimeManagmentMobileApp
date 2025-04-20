import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Color themes
const colorThemes = {
    purple: {
        text: "#4B367C",
        primary: "#A88BEB",
        background: "#DCCFF9",
        accent: "#5D3FD3",
        secondary: "#5F9EA0",
    },
    lightBlue: {
        text: "#2C3E50",
        primary: "#89CFF0",
        background: "#D6EAF8",
        accent: "#34495E",
        secondary: "#F5E6CA",
    },
    earthColors: {
        text: "#5D4037",
        primary: "#A39171",
        background: "#EAD7C5",
        accent: "#6B8E23",
        secondary: "#C27C59",
    },
    darkTheme: {
        background: "#121212",
        text: "#FFFFFF",
        primary: "#BB86FC",
        accent: "#d1d1d1",
        secondary: "#a1a1a1",
    }
};

// Create context
const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(colorThemes.purple); //Purple is the default value
    const [themeName, setThemeName] = useState("purple");

    // Load theme from AsyncStorage (Theme goes in the AsyncStorage)
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem("theme");
            if (savedTheme) {
                //setTheme(savedTheme === "dark" ? darkTheme : lightTheme);
                setTheme(colorThemes[savedTheme]);
                setThemeName(savedTheme);
            }
        };
        loadTheme();
    }, []);

    //Changes the color theme
    const toggleTheme = async (selectedTheme) => {
        const newTheme = selectedTheme;
        setTheme(colorThemes[newTheme]);
        setThemeName(newTheme);
        await AsyncStorage.setItem("theme", newTheme); // Save to storage
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, themeName, colorThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);
