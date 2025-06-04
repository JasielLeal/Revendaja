import React, { createContext, useEffect, useContext, useState } from "react";
import { useColorScheme as useNativewindColorScheme } from "nativewind";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
    isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: "light",
    toggleTheme: () => { },
    isLoading: true,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const { colorScheme, setColorScheme } = useNativewindColorScheme();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadTheme = async () => {
            const saved = await AsyncStorage.getItem("theme");
            console.log("Saved theme:", saved);
            if (saved === "light" || saved === "dark") {
                setColorScheme(saved); // aplica o tema salvo no NativeWind
            }
            setIsLoading(false);
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newTheme = colorScheme === "light" ? "dark" : "light";
        await AsyncStorage.setItem("theme", newTheme);
        setColorScheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme: colorScheme as Theme, toggleTheme, isLoading }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
