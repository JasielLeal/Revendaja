import React, { useContext, useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AuthContext from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import { FindStoreNameByUser } from "./services/FindStoreNameByUser";
import { Button } from "@/components/buttton";
import CreateStoreModal from "./components/createStoreModal";
import { Overview } from "./components/overview/overview";
import { Stock } from "./components/stock/stock";
import { PedingSale } from "./components/pendingSale/pendingSale";
import { Report } from "./components/report/report";

export function Store() {
    const layout = useWindowDimensions();
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: subdomain } = useQuery({
        queryKey: ["FindStoreNameByUser"],
        queryFn: FindStoreNameByUser,
    });

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "overview", title: "Overview" },
        { key: "stock", title: "Estoque" },
        { key: "report", title: "Relatório" },
        { key: "pendingsale", title: "Pendentes" },
    ]);

    const renderScene = SceneMap({
        overview: Overview,
        stock: Stock,
        report: Report,
        pendingsale: PedingSale,
    });

    if (!user?.userHasStore) {
        return (
            <View className="bg-bg h-screen w-full flex justify-center px-5">
                <Text className="text-textForenground text-center -mt-40">
                    Você ainda não tem uma loja :(
                </Text>
                <Button name="Criar Loja" onPress={() => setIsModalOpen(true)} />
                <CreateStoreModal open={isModalOpen} />
            </View>
        );
    }

    return (
        <View className="bg-bg flex-1 w-full pt-16">
            <Text className="text-white font-medium text-lg text-center">Minha Loja</Text>
            <Text className="text-primaryPrimary text-sm text-center mb-5 px-5">
                {subdomain ? `${subdomain.data}.revendaja.com` : ""}
            </Text>

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                style={{ backgroundColor: "#1E1E2F"}}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        indicatorStyle={{ backgroundColor: "#FF7100", height: 2 }}
                        activeColor="white"
                        inactiveColor="#bbb"
                        contentContainerStyle={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                        pressColor="transparent"
                        style={{
                            backgroundColor: "#121212",
                            borderBottomWidth: 0,
                            elevation: 0,
                        }}
                    />
                )}
            />
        </View>
    );
}
