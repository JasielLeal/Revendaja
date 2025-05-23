import { ImageBackground, View, Image, Text, TouchableOpacity, TextInput, ScrollView, Platform } from "react-native";
import logo from "@/assets/logo.png"
import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from "./schemas/LoginSchema";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/types/navigation";
import React from "react";
import { InputHidden } from "../../../components/inputHidden";
export function Login() {

    const { singInFc } = useContext(AuthContext);
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(LoginSchema),
        mode: 'onSubmit', // Validação será feita apenas no envio do formulário
    });

    async function handleLogin(data: FieldValues) {
        try {
            await singInFc(data)
        } catch (e) {
            console.log(e)
            console.log(e)
            console.log(JSON.stringify(e, null, 4))
        }
    }

    const navigate = useNavigation<StackNavigationProp<RootStackParamList>>()

    return (
        <>
            <ImageBackground
                source={require("@/assets/bg.png")}
                className="flex-1"
                resizeMode="cover"
            >
                <ScrollView>
                    <View className="w-full flex items-center justify-center px-5 h-screen">
                        <Image source={logo} alt="logo do site" className="w-[150px] h-[35px]" />
                        <View className="w-full">
                            <Text className="text-base text-white font-normal mt-7 mb-2 ">
                                Email
                            </Text>

                            <Controller
                                control={control}
                                name='email'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <TextInput
                                            className={Platform.OS == 'ios' ? "bg-[#202020] py-4 px-4 rounded-xl w-full text-white" : "bg-[#202020] py-3 px-3 rounded-xl w-full text-white"}
                                            placeholder="seuemail@gmail.com"
                                            placeholderTextColor={'#7D7D7D'}
                                            keyboardType="email-address"
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                        />
                                        {errors.email && <Text className="text-red-500">{errors.email.message as string}</Text>}
                                    </>
                                )}
                            />
                            <Text className="text-base text-white font-normal mt-5 mb-2">
                                Senha
                            </Text>
                            <Controller
                                control={control}
                                name='password'
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <View >
                                        <InputHidden
                                            name="password"
                                            placeholder="Sua senha"
                                            keyboardType="default"
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                        {errors.password && <Text className="text-red-500">{errors.password.message as string}</Text>}
                                    </View>
                                )}
                            />

                            <View>
                                <TouchableOpacity className="flex items-end my-5 " onPress={() => navigate.navigate('forgetpassword')}>
                                    <Text className="text-end text-primaryPrimary font-medium">
                                        Esqueceu a senha?
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity className="bg-primaryPrimary py-3 px-3 rounded-xl mt-2" onPress={handleSubmit(handleLogin)}>
                                <Text className="text-center font-medium text-white">
                                    Entrar
                                </Text>
                            </TouchableOpacity>

                            <View className="flex  flex-row gap-1 justify-center my-5">
                                <Text className="text-white">
                                    Não tem conta?
                                </Text>
                                <TouchableOpacity className="flex items-end " onPress={() => navigate.navigate("createUser")}>
                                    <Text className="text-end text-primaryPrimary font-medium">
                                        Criar gratuitamente
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </ImageBackground>

        </>
    );
}
