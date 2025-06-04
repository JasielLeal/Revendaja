import { Text, TouchableOpacity, View } from "react-native";
import { FinancialOverview } from "./components/financialOverview";
import React from "react";
export function Extract() {

    return (
        <>
            <View className="dark:bg-background bg-backgroundLight h-screen w-full px-5">
                <View>
                    <Text className="dark:text-white font-medium mt-16 text-lg text-center mb-5">Extrato</Text>
                </View>
                <FinancialOverview />
            </View>
        </>
    );
}
