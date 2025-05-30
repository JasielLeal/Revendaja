import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SubscriptionDetails } from "./services/SubscriptionDetails";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CustomModal from "@/components/modal";
import { CancelSubscriptionAtPeriodEnd } from "./services/cancelSubscriptionAtPeriodEnd";
import { LoadingOverlay } from "../loading";
import { ReactiveSubscription } from "./services/reactiveSubscription";
import { useColorScheme } from "nativewind";

export function MyPlan() {
    const { data } = useQuery({
        queryKey: ["SubscriptionDetails"],
        queryFn: SubscriptionDetails
    });

    const [openModal, setOpenModal] = React.useState(false);
    const [reactiveSubscriptionModal, setReactiveSubscriptionModal] = React.useState(false);

    const queryClient = useQueryClient();

    const { isPending, mutateAsync: CancelSubscriptionAtPeriodEndFn } = useMutation({
        mutationFn: () => {
            return CancelSubscriptionAtPeriodEnd(data.subscriptionId); // retorno necessário
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["SubscriptionDetails"] });
            setOpenModal(false);
        },
        onError: (error) => {
            setOpenModal(false);
            console.log(error)
        }
    })

    const { isPending: isLoading, mutateAsync: ReactiveSubscriptionFn } = useMutation({
        mutationFn: () => {
            return ReactiveSubscription(data.subscriptionId); // retorno necessário
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["SubscriptionDetails"] });
            setOpenModal(false);
        },
        onError: (error) => {
            setReactiveSubscriptionModal(false);
            console.log(error)
        }
    })

    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

    const planNames: Record<string, string> = {
        "29.99": "Starter",
        "49.99": "Exclusive"
    };
    const planName = data?.amount ? planNames[data.amount] || "Unknown" : "Free";
    const { colorScheme } = useColorScheme()
    return (
        <>
            {isPending || isLoading ?

                <LoadingOverlay />

                :

                <>

                    <View className="flex-1 dark:bg-background bg-backgroundLight px-5">
                        <View className="flex flex-row items-center mt-16 mb-5 justify-between">
                            <TouchableOpacity onPress={() => navigate.goBack()}>
                                <Icon name="chevron-back" color={colorScheme === "dark" ? "#fff" : "#000"} size={20} />
                            </TouchableOpacity>
                            <Text className="dark:text-white font-medium text-lg text-center">Minhas Assinaturas</Text>
                            <View className="w-[25px]" />
                        </View>

                        <View className="dark:bg-forenground bg-input p-4 rounded-lg">
                            <View className="flex flex-row items-center gap-1">
                                <Text className="text-primary text-xl font-medium">{planName}</Text>
                                <Text className="dark:text-white text-sm">/ Atual</Text>
                            </View>
                        </View>

                        {data && (
                            <>
                                <View className="flex flex-row items-center justify-between">
                                    <Text className="dark:text-white font-medium my-7 text-sm">Detalhes do pagamento</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigate.navigate("updateCard", {
                                                customerId: data.customerId,
                                                subscriptionId: data.subscriptionId,
                                            });
                                        }}
                                    >
                                        <Text className="text-primary my-7 text-xs">Atualizar cartão</Text>
                                    </TouchableOpacity>
                                </View>


                                <View className="dark:bg-forenground bg-input rounded-lg p-4">
                                    <View className="flex flex-row items-center gap-3">
                                        <Text className="dark:text-white font-medium">Cartão:</Text>
                                        <Text className="text-textForenground">**********{data.last4}</Text>
                                    </View>
                                    <View className="flex flex-row items-center gap-2 mt-5">
                                        <Text className="dark:text-white font-medium">
                                            {data.cancel_at ? "Serviço ativo até:" : "Próxima cobrança:"}
                                        </Text>
                                        <Text className="text-textForenground capitalize">
                                            {format(new Date(data.nextPaymentDate), "d 'de' MMMM, yyyy", { locale: ptBR })}
                                        </Text>
                                    </View>
                                    <View className="flex flex-row items-center gap-2">
                                        <Text className="dark:text-white font-medium">
                                            {
                                                data.cancel_at ?
                                                    ""
                                                    :
                                                    "Valor da cobrança:"
                                            }
                                        </Text>
                                        <Text className="text-textForenground">

                                            {
                                                data.cancel_at ?
                                                    ""
                                                    :
                                                    `R$ ${formatCurrency(data.amount)}`
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        if (data?.cancel_at) {
                                            setReactiveSubscriptionModal(true);
                                        } else {
                                            setOpenModal(true);
                                        }
                                    }} className="flex flex-row items-center gap-3 mt-5">
                                        <Text className={data.cancel_at ? "text-primary mt-5" : "text-red-500 mt-5"}>
                                            {data.cancel_at ? "Reativar Assinatura" : "Cancelar Assinatura"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View >

                    <CustomModal
                        visible={openModal}
                        onClose={() => setOpenModal(false)}
                        title="Deseja cancelar sua assinatura?"
                        onConfirm={() => CancelSubscriptionAtPeriodEndFn()}
                        confirmText="Confirmar"
                    >
                        <Text className="dark:text-white text-center">
                            Você ainda poderá usar o serviço até o final do período de cobrança atual.
                        </Text>
                    </CustomModal>

                    <CustomModal
                        visible={reactiveSubscriptionModal}
                        onClose={() => setReactiveSubscriptionModal(false)}
                        title="Deseja reativar sua assinatura?"
                        onConfirm={() => ReactiveSubscriptionFn()}
                        confirmText="Confirmar"
                    >
                        <Text className="dark:text-white text-center">
                            O dia da próxima cobrança será o mesmo do último pagamento.
                        </Text>
                    </CustomModal>
                </>
            }



        </>
    );
}
