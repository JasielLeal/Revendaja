import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AuthContext from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import { FindStoreNameByUser } from "./services/FindStoreNameByUser";
import { Button } from "@/components/buttton";
import CreateStoreModal from "./components/createStoreModal";
import { Overview } from "./components/overview/overview";
import { Stock } from "./components/stock/stock";
import { PedingSale } from "./components/pendingSale/pendingSale";
import { Report } from "./components/report/report";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";

const Tab = createMaterialTopTabNavigator();

export function Store() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()

    const { data: subdomain } = useQuery({
        queryKey: ["FindStoreNameByUser"],
        queryFn: FindStoreNameByUser,
    });

    if (!user?.userHasStore) {
        return (
            <View className="bg-bg h-screen w-full flex justify-center px-5">
                <Text className="text-textForenground text-center -mt-40">
                    Você ainda não tem uma loja :(
                </Text>
                <Button name="Criar Loja" onPress={() => navigate.navigate("CreateStore")} />
            </View>
        );
    }

    return (
        <View className="bg-bg flex-1 w-full pt-16">
            <Text className="text-white font-medium text-lg text-center">Minha Loja</Text>
            <Text className="text-primaryPrimary text-sm text-center mb-5 px-5">
                {subdomain ? `${subdomain.data}.revendaja.com` : ""}
            </Text>

            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        fontSize: 10,
                        fontWeight: "600",
                        textTransform: "none",
                    },
                    tabBarStyle: {
                        backgroundColor: "#121212",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#FF7100",
                        height: 2,
                    },
                    tabBarActiveTintColor: "#FF7100",
                    tabBarInactiveTintColor: "#ffffff",
                }}
            >
                <Tab.Screen name="Overview" component={Overview} />
                <Tab.Screen name="Estoque" component={Stock} />
                <Tab.Screen name="Relatório" component={Report} />
                <Tab.Screen name="Pendentes" component={PedingSale} />
            </Tab.Navigator>
        </View>
    );
}
