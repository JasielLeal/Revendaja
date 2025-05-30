import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Text } from "react-native";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { BestSellingCompany } from "../services/bestSellingCompany";
import { useColorScheme } from "nativewind";

export function Graphic() {

    const { data: bestSelling } = useQuery({
        queryKey: ["bestSellingCompany"],
        queryFn: BestSellingCompany,
    });

    const { colorScheme } = useColorScheme()

    const colorPalette: Record<string, string> = {
        "Natura": "#4CAF50",
        "Oboticario": "#FFC107",
        "Avon": "#FF5722",
        "Eudora": "#03A9F4",
        "Jequiti": "#9C27B0"
    };

    if (!bestSelling) {
        return
    }

    // Garantir que bestSelling é um array antes de processar
    const formattedData = Array.isArray(bestSelling)
        ? bestSelling
            .filter(item => isNaN(Number(item.name))) // Remove entradas numéricas
            .map(item => ({
                name: item.name,
                population: item.population,
                color: colorPalette[item.name] || `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Usa cor fixa ou gera uma aleatória
                legendFontColor: colorScheme === "dark" ? "#FFFFFF" : "#000000",
                legendFontSize: 14,
            }))
        : [];

    const screenWidth = Dimensions.get("window").width;

    return (
        <>
            <>
                <View className="mt-5 rounded-lg">
                    <View className="dark:bg-forenground bg-input rounded-t-lg p-4">
                        <Text className="dark:text-white text-lg font-semibold">Gráficos de vendas</Text>
                        <Text className="text-textForenground">Distribuição de marcas mais vendidas</Text>
                    </View>
                    <PieChart
                        data={formattedData}
                        width={screenWidth * 0.916}
                        height={220}
                        chartConfig={{
                            color: () => `black`,
                            decimalPlaces: 2,
                        }}

                        accessor="population"
                        backgroundColor={colorScheme === "dark" ? "#202020" : "#DFDFDF"}
                        paddingLeft="10"
                        center={[10, 0]}
                    />

                </View>


                {
                    formattedData?.map((company: any) => (

                        <View className="p-4 dark:bg-forenground bg-input mt-5 rounded-lg" key={company?.id}>
                            <Text className="dark:text-white font-semibold">
                                {company.population} - {company.name}
                            </Text>
                        </View>
                    ))
                }
            </>
        </>
    )
}