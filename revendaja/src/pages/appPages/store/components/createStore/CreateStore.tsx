import { Button } from "@/components/buttton";
import { Input } from "@/components/input";
import { RootStackParamList } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'
import { CreateStoreForm } from "./hooks/CreateStoreForm";
import { useState } from "react";
import { phoneNumberMaskDynamic } from "@/utils/formatNumberPhone";
import { CreateStoreFn } from "./service/CreateStore";
import { useMutation } from "@tanstack/react-query";

export function CreateStore() {

    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()
    const { handleSubmit, register, setValue } = CreateStoreForm();
    const [numberPhone, setNumberPhone] = useState('');

    const { mutateAsync: CreateStoreFnn } = useMutation({
        mutationFn: async (data: any) => {

            const newData = {...data, numberPhone: data.phone.replace(/\D/g, '') }

            await CreateStoreFn(newData)
        },
        onSuccess: () => {
            navigate.navigate('Home')
        },
        onError: (error) => {
            console.log(error)

            console.log(JSON.stringify(error, null, 4))
        }
    })

    return (
        <View className="bg-background flex-1 w-full px-5">
            <View className="flex flex-row items-center mt-16 mb-5 justify-between">
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <Icon name="chevron-back" color={"#fff"} size={20} />
                </TouchableOpacity>
                <Text className="text-white font-medium text-lg text-center ">
                    Criar loja
                </Text>
                <TouchableOpacity onPress={() => navigate.navigate('AddBankSlip')}>
                    <Icon name="" color={"#fff"} size={20} />
                </TouchableOpacity>
            </View>

            <View className="mt-5">
                <Text className="mb-2 text-textForenground font-semibold">
                    Nome da loja
                </Text>
                <Input {...register("name")} onChangeText={(text) => setValue("name", text)} />
            </View>

            <View className="mt-5">
                <Text className="mb-2 text-textForenground font-semibold">
                    Descrição
                </Text>
                <Input {...register("description")} onChangeText={(text) => setValue("description", text)} />
            </View>

            <View className="mt-5">
                <Text className="mb-2 text-textForenground font-semibold">
                    Número de contato
                </Text>
                <Input
                    name="phone"
                    value={numberPhone}
                    onChangeText={(text) => {
                        const formatted = phoneNumberMaskDynamic(text);
                        setNumberPhone(formatted);
                        setValue("phone", formatted);
                    }}
                />
            </View>
            <View className="mt-10">
                <Button name="Criar loja" onPress={handleSubmit((data) => CreateStoreFnn(data))} />
            </View>
        </View>
    )
}