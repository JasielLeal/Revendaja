import { Text, TouchableOpacity, View } from "react-native";
import { FinancialOverview } from "./components/financialOverview";
import React from "react";

export function Extract() {

    return (
        <>
            <View className="bg-background h-screen w-full px-5">
                <View>
                    <Text className="text-white font-medium mt-16 text-lg text-center mb-5">Extrato</Text>
                    
                </View>
                <FinancialOverview />
            </View>
        </>
    );
}
