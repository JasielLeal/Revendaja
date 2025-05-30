import { Text, TouchableOpacity } from 'react-native';
import {  useColorScheme } from "nativewind";
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@/context/themeContext';
export function ThemeToggle() {
    
     const { theme, toggleTheme } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme} className="p-4 bg-secondary  rounded-full mt-4">
            <Text className="text-white text-center">
                {theme === "dark" ? <Icon name='moon'/> : <Icon name='sunny'/>}
            </Text>
        </TouchableOpacity>
    );
}
