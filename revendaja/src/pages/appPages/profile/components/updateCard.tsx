import { RootStackParamList } from "@/types/navigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CardField, useStripe, CardBrand, CardForm } from "@stripe/stripe-react-native";
import { useState } from "react";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type UpdateCardRouteProp = RouteProp<RootStackParamList, 'updateCard'>;

export function UpdateCard() {

    const { confirmSetupIntent } = useStripe();
    const [cardComplete, setCardComplete] = useState(false);

    const route = useRoute<UpdateCardRouteProp>();
    const { customerId, subscriptionId } = route.params;

    const handleUpdateCard = async () => {
        console.log("teste")
    }
    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View className="bg-bg flex-1 px-5">
            <View className="flex flex-row items-center mt-16 mb-5 justify-between">
                <TouchableOpacity onPress={() => navigate.goBack()}>
                    <Icon name="chevron-back" color={"#fff"} size={20} />
                </TouchableOpacity>
                <Text className="text-white font-medium text-lg text-center">Atualizar Cartão</Text>
                <View className="w-[25px]" />
            </View>
            <CardForm
                onFormComplete={(cardDetails) => {
                    console.log(cardDetails);
                    console.log(cardComplete)
                    setCardComplete(cardDetails.complete);
                    // Aqui você pode continuar com confirmSetupIntent ou outro fluxo.
                }}
                style={{ height: 300 }}
                cardStyle={{
                    backgroundColor: '#ffffff',
                    textColor: '#000000',
                    placeholderColor: '#a1a1aa',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    borderRadius: 8,
                    fontSize: 16,
                }}
                placeholders={{
                    number: 'Número do cartão',
                    expiration: 'MM/AA',
                    cvc: 'CVC',
                    postalCode: 'CEP',
                }}
                autofocus
            />
            <TouchableOpacity
                onPress={handleUpdateCard}
                disabled={!cardComplete}
                className={`rounded-xl py-4 mt-4 ${cardComplete ? 'bg-primaryPrimary' : 'bg-gray-400'}`}
            >
                <Text className="text-center text-white font-semibold text-base">
                    Atualizar cartão
                </Text>
            </TouchableOpacity>
        </View>
    )
}