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
import { useColorScheme } from "nativewind";

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
            <View className="dark:bg-background bg-backgroundLight h-screen w-full flex justify-center px-5">
                <Text className="dark:text-textForenground text-center -mt-40">
                    Você ainda não tem uma loja :(
                </Text>
                <Button name="Criar Loja" onPress={() => navigate.navigate("CreateStore")} />
            </View>
        );
    }
    const { colorScheme } = useColorScheme()

    return (
        <View className="dark:bg-background bg-backgroundLight flex-1 w-full pt-16">
            <Text className="dark:text-white font-medium text-lg text-center">Minha Loja</Text>
            <Text className="text-primary text-sm text-center mb-5 px-5">
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
                        backgroundColor: colorScheme === "dark" ? "#121212" : "#f4f5f7",
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: "#FF7100",
                        height: 2,
                    },
                    tabBarActiveTintColor: "#FF7100",
                    tabBarInactiveTintColor:  colorScheme === "dark" ? "#B0B0B0" : "#6B7280",
                }}
            >
                <Tab.Screen name="Visão Geral" component={Overview} />
                <Tab.Screen name="Estoque" component={Stock} />
                <Tab.Screen name="Relatório" component={Report} />
                <Tab.Screen name="Pendentes" component={PedingSale} />
            </Tab.Navigator>
        </View>
    );
}
