import { Text, TouchableOpacity } from 'react-native';
import {  useColorScheme } from "nativewind";
import Icon from 'react-native-vector-icons/Ionicons'
export function ThemeToggle() {

    const { colorScheme, toggleColorScheme} = useColorScheme()

    console.log('Current color scheme:', colorScheme);

    return (
        <TouchableOpacity onPress={toggleColorScheme} className="p-4 bg-secondary  rounded-full mt-4">
            <Text className="text-white text-center">
                {colorScheme === "dark" ? <Icon name='moon'/> : <Icon name='sunny'/>}
            </Text>
        </TouchableOpacity>
    );
}
