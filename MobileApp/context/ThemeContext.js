import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//The dark theme default primary
//primary: "#1e1f1d",

// Create context
const ThemeContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
    //Color themes
    const colorThemes = {
        purple: {
            background: "#2E073F",
            text: "#E6D9A2",
            primary: "#624E88",
            accent: "#A67FB7",
            secondary: "#EBD3F8",
            highlight: "#ebbefa"
        },
        blue: {
            background: "#A6E3E9",
            //text: "#E3FDFD",
            text: "#627372",
            primary: "#71C9CE",
            accent: "#58a8a4",
            secondary: "#CBF1F5",
            highlight: "#E3FDFD"
        },
        green: {
            background: "#CAE8BD",
            //text: "#ECFAE5",
            text: "#6b7a63",
            primary: "#B0DB9C",
            accent: "#8bba72",
            secondary: "#DDF6D2",
            highlight: "#ECFAE5"
        },
        brown: {
            background: "#C39898",
            text: "#F1E5D1",
            primary: "#987070",
            accent: "#ab9268",
            secondary: "#DBB5B5",
            highlight: "#fcf2e1"
        },
        orange: {
            text: "#5A3B1F",
            primary: "#FFBF99",
            background: "#FFDAB8",
            accent: "#FFE4C2",
            secondary: "#FFFFFF",
            highlight: "#FFF1E2"
        },
        darkTheme: {
            background: "#272725",
            text: "#FFFFFF",
            primary: "#1e1f1d",
            accent: "#3A3A3A",
            secondary: "#787d77",
            highlight: "#ECDFCC"
        },
        blue1: {
            background: "#B3C8CF",
            text: "#F1F0E8",
            primary: "#89A8B2",
            accent: "#c3e1eb",
            secondary: "#E5E1DA",
            highlight: "#fffef2"
        },
        pink: {
            background: "#EC7FA9",
            text: "#FFEDFA",
            primary: "#BE5985",
            accent: "#8a5b7c",
            secondary: "#FFB8E0",
            highlight: "#fff5fc"
        },
    };

    const [theme, setTheme] = useState(colorThemes.purple); //Purple is the default value
    const [themeName, setThemeName] = useState("purple");

    // Load theme from AsyncStorage (Theme goes in the AsyncStorage)
    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await AsyncStorage.getItem("theme");
            if (savedTheme) {
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
