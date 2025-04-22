
import { Button } from '@/components/buttton';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
    onBack: () => void;
};

export function PaymentConfirmedScreen({ onBack }: Props) {
    
    return (
        <>
            <View className='flex-1 items-center justify-center bg-bg px-5'>
                <Icon name="checkmark-circle" size={100} color="#FF7100" />
                <Text className='text-white text-lg font-semibold mt-5'>Pagamento confirmado</Text>
                <Text className='text-white text-center text-sm mb-5'>Seu pagamento foi confirmado com sucesso!</Text>
                <View className='w-full'>
                    <Button name='Voltar' onPress={onBack}/>
                </View>
            </View>
        </>
    )
}