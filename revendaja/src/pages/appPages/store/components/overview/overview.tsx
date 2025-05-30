import { Text } from "react-native";
import { View } from "react-native";
import React from "react";
import { Graphic } from "./components/graphic";


export function Overview() {

    return (
        <>
            <View className="px-5 flex-1 dark:bg-background bg-backgroundLight">
                <View className="flex flex-row items-center justify-between mt-5">
                    <Text className="dark:text-white text-xl font-semibold">Visão Geral</Text>
                </View>
                <Graphic />
            </View>
        </>
    )
}