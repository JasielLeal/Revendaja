import CustomModal from "@/components/modal";
import AuthContext from "@/context/authContext";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Image, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { DisableAccount } from "./services/DisabledAccount";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import { Avatar } from "@/components/avatart";
import { useColorScheme } from "nativewind";

export function Profile() {

    const { user, logoutFc } = useContext(AuthContext)


    const [openModal, setOpenModal] = useState(false)

    async function handleConfirm() {
        await DisableAccountFn()
        setOpenModal(false);
    };

    const { mutateAsync: DisableAccountFn } = useMutation({
        mutationFn: DisableAccount,
        onSuccess: () => {
            logoutFc()
        },
        onError: () => {
            console.log("Deu algum error")
        }
    })

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

    const Links = [
        { id: 1, name: "Minha Assinatura", icon: "card", link: 'MyPlan', description: "Gerencie ou altere sua assinatura." },
        { id: 2, name: "Nossos Planos", icon: "star", link: 'OurPlans', description: "Confira os planos disponíveis para você." },
        { id: 3, name: "Seus Dados", icon: "shield-checkmark", link: '/', description: "Atualize suas informações pessoais." },
        { id: 4, name: "Nossos Termos", icon: "reader", link: '/', description: "Consulte os termos e políticas." },
        { id: 5, name: "Loja", icon: "pencil", link: '/', description: "Gerencie os dados da sua loja." },
    ];


    const { colorScheme } = useColorScheme()

    return (
        <>
            <View className="flex-1 dark:bg-background bg-backgroundLight px-5">
                <View>
                    <View className='flex flex-row items-center justify-center mt-16 mb-5'>
                        <Text className='dark:text-white font-semibold text-center'> Perfil</Text>
                    </View>
                    <View className="flex flex-row items-center gap-3  rounded-xl justify-between">
                        <View className="flex flex-row gap-3 items-center">
                            <Avatar />
                            <View>
                                <View className="flex flex-row items-center gap-1">
                                    <Text className="dark:text-white font-medium">
                                        {user?.name}
                                    </Text>
                                    <Text className="dark:text-white font-medium">
                                        {user?.secondName}
                                    </Text>
                                </View>
                                <Text className="text-primary">
                                    {user?.plan}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity>
                            <Text className="text-red-600" onPress={() => logoutFc()}>
                                Sair
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View className="pt-5">
                    {
                        Links.map((link) => (
                            <TouchableOpacity
                                key={link.id}
                                className="flex flex-row items-center justify-between border-b pb-4 dark:border-[#ffffff17] border-[#2c2c2c17] pt-4"
                                onPress={() => navigation.navigate(link.link)}

                            >
                                <View className="flex flex-col">
                                    <View className="flex flex-row items-center gap-2">
                                        <Icon name={link.icon} size={25} color={colorScheme === "dark" ? "#fff" : "#000"} />
                                        <Text className="dark:text-white font-medium">
                                            {link.name}
                                        </Text>
                                    </View>
                                    <Text className="text-gray-500 text-xs">
                                        {link.description}
                                    </Text>
                                </View>
                                <Icon name="chevron-forward" size={20} color={colorScheme === "dark" ? "#fff" : "#000"} />
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <CustomModal
                    visible={openModal}
                    onClose={() => setOpenModal(false)}
                    title="Deseja deletar sua conta?"
                    onConfirm={handleConfirm}
                    confirmText="Confirmar"
                >
                    <Text className="text-white">Essa ação não pode ser desfeita. Todos os seus dados serão permanentemente excluídos.</Text>
                </CustomModal>


            </View>
        </>
    )
}