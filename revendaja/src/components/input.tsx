import React from "react";
import { Platform, TextInput, TextInputProps } from "react-native";

type InputProps = TextInputProps & {
    name: string;
};

export function Input({ placeholder, ...props }: InputProps) {
    return (
        <>
            <TextInput
                className={Platform.OS == 'ios' ?
                    "dark:bg-forenground bg-input  py-4 px-4 rounded-xl w-full dark:text-white"
                    :
                    "dark:bg-forenground bg-input py-3 px-3 rounded-xl w-full dark:text-white"}
                placeholder={placeholder}
                placeholderTextColor={'#7D7D7D'}
                keyboardType="default"
                {...props}
            />
        </>
    )
}