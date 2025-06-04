import { Button } from "@/components/buttton";
import AuthContext from "@/context/authContext";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Alert, ScrollView, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { PaymentConfirmedScreen } from "./paymentConfirmed";
import { fetchPaymentIntent } from "../services/fetchPaymentIntent";
import { openPaymentSheet } from "../services/openPaymentSheet";
import { LoadingOverlay } from "./loading";
import { useColorScheme } from "nativewind";

export function OurPlans() {
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [PaymentConfirmed, setPaymentConfirmed] = useState(false)

    const plans = [
        { name: "Starter", price: "29,99", priceId: "price_1QjiK12M4f5OsxL2WEwMqvxg", customProducts: "25", stock: "250", tickets: "20", description: "O plano ideal para quem está começando e deseja explorar funcionalidades essenciais com um preço acessível.", limitSale: "Sem limite" },
        { name: "Exclusive", price: "49,99", priceId: "price_1QoO4D2M4f5OsxL2ZS0QMXQx", customProducts: "100", stock: "500", tickets: "60", description: "Aproveite o máximo da nossa plataforma com recursos exclusivos e prioridade de atendimento para uma experiência completa", limitSale: "Sem limite" },
    ];

    const queryClient = useQueryClient();

    const createPaymentIntentMutation = useMutation({
        mutationFn: fetchPaymentIntent,
        onSuccess: ({ clientSecret, planName, priceId }) => {
            setClientSecret(clientSecret); // Se ainda precisar armazenar
            paymentSheetMutation.mutate({ clientSecret, planName, priceId });
        },
        onError: (error: any) => {
            if (error.response) {
                // Erro vindo da API
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            } else if (error.request) {
                // Requisição foi feita mas não teve resposta
                console.log("Request:", error.request);
            } else {
                // Algo deu errado na config da requisição
                console.log("Erro genérico:", error.message);
            }
        },
    });

    const paymentSheetMutation = useMutation({
        mutationFn: openPaymentSheet,
        onSuccess: ({ planName }) => {

            // Efeitos colaterais (ideal ficar aqui!)
            setPaymentConfirmed(true);
            queryClient.invalidateQueries({ queryKey: ["GetPlan"] });

            setUser((prevUser) => {
                if (prevUser) {
                    return { ...prevUser, plan: planName };
                }
                return prevUser;
            });


        },
        onError: (error: any) => {
            console.error("Erro ao processar pagamento:", error);
            Alert.alert("Erro", "Ocorreu um erro durante o processo de pagamento. Tente novamente.");
        },
    });

    const { colorScheme } = useColorScheme()

    return (

        PaymentConfirmed ?

            <PaymentConfirmedScreen onBack={() => setPaymentConfirmed(false)} />

            :

            paymentSheetMutation.isPending ?

                <LoadingOverlay />

                :

                <View className="flex-1 dark:bg-background bg-backgroundLight px-5">
                    {/* Header */}
                    <View className="flex flex-row justify-between pt-16" >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back" size={20} color={colorScheme === "dark" ? "#fff" : "#000"} />
                        </TouchableOpacity>
                        <Text className="dark:text-white font-semibold text-xl">Nossos Planos</Text>
                        <TouchableOpacity>
                            <Icon name="help-circle" size={25} color={"#FF7100"} />
                        </TouchableOpacity>
                    </View>

                    {/* Plano Atual */}
                    < Text className="dark:text-white font-medium mt-10" > Seu plano</Text>
                    <View className="dark:bg-forenground bg-input p-4 rounded-xl mt-5">
                        <View className="flex flex-row items-center">
                            <Text className="dark:text-white text-lg">{user?.plan} -</Text>
                            <Text className="text-primary"> Atualmente</Text>
                        </View>

                        <View className="flex flex-row gap-2 items-center">
                            <Text className="dark:text-white font-medium text-lg">{user?.plan === "Free" ? "Gratuito" : user?.plan === "Starter" ? "R$ 29,99" : "R$ 49,99"}</Text>
                            <Text className="text-textForenground"> {user?.plan === "Free" ? "" : "/ Mês"}</Text>
                        </View>

                        <Text className="text-textForenground mt-5 text-sm">

                            {
                                user?.plan === "Free" ?
                                    "O ponto de partida perfeito para explorar tudo o que nossa aplicação tem a oferecer!"
                                    : user?.plan === "Starter" ?
                                        "O plano ideal para quem está começando e deseja explorar funcionalidades essenciais com um preço acessível."
                                        :
                                        "Aproveite o máximo da nossa plataforma com recursos exclusivos e prioridade de atendimento para uma experiência completa"}
                        </Text>
                    </View>

                    {/* Título dos Planos */}
                    <Text className="text-textForenground mt-10 text-sm">Nossos planos</Text>
                    <Text className="dark:text-white font-medium text-base">Opções ideais para você</Text>

                    {/* Lista de Planos */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: "row", gap: 16 }}>
                        {plans.map((plan) => (
                            <View key={plan.name} className="dark:bg-forenground bg-input p-4 rounded-xl shadow-lg mt-5 w-[300] mb-10">
                                <Text className="text-primary text-xl font-semibold">{plan.name}</Text>
                                <View className="flex flex-row gap-2 items-center">
                                    <Text className="dark:text-white font-medium text-2xl">R$ {plan.price}</Text>
                                    <Text className="text-textForenground text-sm">/ mês</Text>
                                </View>
                                <Text className="text-textForenground mt-3 text-sm">
                                    {plan.description}
                                </Text>

                                {/* Benefícios do Plano */}
                                <View className="mt-5">
                                    {plan.customProducts && (
                                        <View className="flex flex-row items-center gap-2">
                                            <Icon name="checkmark" size={25} color="#FF7100" />
                                            <Text className="dark:text-white text-sm">{plan.customProducts} Produtos personalizados</Text>
                                        </View>
                                    )}
                                    {plan.stock && (
                                        <View className="flex flex-row items-center gap-2">
                                            <Icon name="checkmark" size={25} color="#FF7100" />
                                            <Text className="dark:text-white text-sm">{plan.stock} Produtos no estoque</Text>
                                        </View>
                                    )}
                                    {plan.tickets && (
                                        <View className="flex flex-row items-center gap-2">
                                            <Icon name="checkmark" size={25} color="#FF7100" />
                                            <Text className="dark:text-white text-sm">{plan.tickets} boletos</Text>
                                        </View>
                                    )}
                                    <View className="flex flex-row items-center gap-2 mb-4">
                                        <Icon name="checkmark" size={25} color="#FF7100" />
                                        <Text className="dark:text-white text-sm">Sem limite de vendas</Text>
                                    </View>

                                    {/* Botão de Pagamento */}
                                    {
                                        user?.plan === plan.name ?

                                            <Button name="Seu plano atual" disabled={true} />

                                            :

                                            <Button
                                                name="Adquirir"
                                                onPress={() => createPaymentIntentMutation.mutate({ priceId: plan.priceId, planName: plan.name })}
                                                disabled={createPaymentIntentMutation.isPending}
                                            />
                                    }
                                </View>

                            </View>
                        ))}
                    </ScrollView>
                </View >
    );
}
