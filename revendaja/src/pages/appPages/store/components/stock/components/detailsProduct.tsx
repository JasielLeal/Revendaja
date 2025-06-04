import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { InvalidateQueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertProductToStock } from "../services/insertProductToStock";
import Toast from "react-native-toast-message";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertProductToStockSchema } from "../schemas/InsertProductToStockSchema";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Keyboard, Platform, TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { formatCurrency } from "@/utils/formatCurrency";
import { QuantityInput } from "@/components/QuantityInput";
import { Button } from "@/components/buttton";
import Icon from "react-native-vector-icons/Ionicons";
import { useColorScheme } from "nativewind";

type DetailsProductRouteProp = RouteProp<RootStackParamList, 'DetailsProduct'>;
type RootStackParamList = {
  DetailsProduct: {
    id: string;
    name: string;
    barcode: string;
    brand: string;
    company: string;
    imgUrl: string;
    suggestedPrice: number;
    normalPrice: number;
    createdAt: string;
    updatedAt: string;
    // adicione os outros campos necessários
  };
};
export function DetailsProduct2() {

    const route = useRoute<DetailsProductRouteProp>();
    const product = route.params;
    const queryClient = useQueryClient();
    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()

    const { mutateAsync: InsertProductToStockFn } = useMutation({
        mutationFn: InsertProductToStock,
        onSuccess: () => {
            queryClient.invalidateQueries(['GetStock'] as InvalidateQueryFilters);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: 'Produto adicionado ao estoque',
            });
            navigate.goBack()
        },
        onError: () => {
            console.log('error');
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(InsertProductToStockSchema),
        mode: 'onSubmit', // Validação será feita apenas no envio do formulário
        defaultValues: {
            quantity: 1, // Define o valor inicial da quantidade
            customPrice: '', // Adicione outros valores padrão aqui, se necessário
        },
    });

    async function onSubmit(data: any) {

        if(data.customPrice === '') {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Por favor, adicione seu valor de venda.',
            })
            return
        }

        const customPrice = data.customPrice?.toString().replace(',', '')
        const newData = {
            ...data,
            customPrice,
            barcode: product?.barcode,
            suggestedPrice: product.suggestedPrice,
            normalPrice: product.normalPrice
        }
        await InsertProductToStockFn(newData)
    }

    const { colorScheme } = useColorScheme()

    return (
        <>
            <SafeAreaView className="px-5 dark:bg-forenground bg-backgroundLight w-full flex-1">
                <View className='flex flex-row justify-between pt-5'>
                    <TouchableOpacity onPress={() => navigate.goBack()}>
                        <Icon name='chevron-back' size={20} color={colorScheme === "dark" ? "#fff" : "#000"} />
                    </TouchableOpacity>
                    <Text className='dark:text-white font-semibold'>Detalhes do Produto</Text>
                    <TouchableOpacity>
                        <Icon name='' size={30} color={"#dc2626"} />
                    </TouchableOpacity>
                </View>
                <View className="flex items-center mt-10">
                    <Image
                        source={product.imgUrl ? { uri: product.imgUrl } : require('@/assets/kaiak.jpg')}
                        className="w-[200px] h-[200px] rounded-xl"
                    />
                </View>
                <View>

                    <Text className="text-textForenground mt-5">{product.company}</Text>
                    <Text className="font-medium text-2xl dark:text-white">{product.name}</Text>

                    <Text className="font-medium mt-5 dark:text-white">
                        De: R$ {(Number(product.normalPrice) / 100).toFixed(2).replace('.', ',')}
                    </Text>
                    <Text className="font-medium text-lg text-primary">
                        Sugerido: R$ {(Number(product.suggestedPrice) / 100).toFixed(2).replace('.', ',')}
                    </Text>
                </View>

                {/* Input de preço personalizado */}
                <Controller
                    control={control}
                    name="customPrice"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            className="dark:bg-background bg-input text-white p-3 rounded-xl mt-5"
                            placeholder="Adicione seu valor de venda"
                            placeholderTextColor="#7D7D7D"
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const formattedValue = formatCurrency(text);
                                onChange(formattedValue);
                            }}
                            value={value}
                            returnKeyType="done"
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    )}
                />

                <Text className="text-textForenground text-sm mt-2 mb-5">
                    {Platform.OS === 'ios'
                        ? 'Obs: se não adicionar valor ao produto ele irá com o valor sugerido.'
                        : 'Obs: se não adicionar valor ao produto ele irá com o valor sugerido.'}
                </Text>

                {/* Componente de Quantidade */}
                <Controller
                    control={control}
                    name="quantity"
                    render={({ field: { value, onChange } }) => (
                        <QuantityInput onQuantityChange={onChange} initialQuantity={value} />
                    )}
                />

                <View className="mb-10">
                    <Button name="Adicionar" onPress={handleSubmit(onSubmit)} />
                </View>
            </SafeAreaView>
        </>
    )
}