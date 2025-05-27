// toastConfig.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ToastConfig, ToastConfigParams } from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';


export const toastConfig: ToastConfig = {
  sucess: ({ text1, text2, onPress }: ToastConfigParams<any>) => (
    <View className="flex-row items-center bg-forenground rounded-xl px-4 py-3 mx-4 mt-2 shadow-lg">
      {/* Ícone */}

      <Icon name="checkmark-circle" size={40} color="#02ab68" className='mr-2' />


      {/* Texto */}
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{text1}</Text>
        <Text className="text-[#E0F0F5] text-sm">{text2}</Text>
      </View>

      {/* Botão de fechar */}
      <TouchableOpacity onPress={onPress} className="ml-2 p-1">
        <Text className="text-[#C0DDF1] text-lg">✕</Text>
      </TouchableOpacity>
    </View>
  ),

  error: ({ text1, text2, onPress }: ToastConfigParams<any>) => (
    <View className="flex-row items-center bg-forenground rounded-xl px-4 py-3 mx-4 mt-2 shadow-lg">
      {/* Ícone */}
      <Icon name="close-circle" size={40} color="#FF0000" className='mr-2' />

      {/* Texto */}
      <View className="flex-1">
        <Text className="text-white font-bold text-base">{text1}</Text>
        <Text className="text-[#E0F0F5] text-sm">{text2}</Text>
      </View>

      {/* Botão de fechar */}
      <TouchableOpacity onPress={onPress} className="ml-2 p-1">
        <Text className="text-[#C0DDF1] text-lg">✕</Text>
      </TouchableOpacity>
    </View>
  ),

};
