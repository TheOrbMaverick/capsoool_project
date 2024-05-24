import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions, Platform } from 'react-native'
import React from 'react'
import { useState } from "react";
import { icons } from "../constants";

interface FormFieldProps {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText?: (text: string) => void;
    otherStyles?: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine the height based on the title
    const isMessageField = title === "your message:";
    const fieldHeight = isMessageField ? 'h-48' : 'h-16';
    const multiline = isMessageField;

    // Adjust field width styles based on the platform
    const fieldWidth = Platform.OS !== 'web'
        ? `w-full ${fieldHeight} px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center`
        : `w-2/4 ${fieldHeight} px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center`;

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

            <View className={fieldWidth}>
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    onChangeText={handleChangeText}
                    secureTextEntry={(title === "Password" || title === "Confirm Password") && !showPassword}
                    multiline={multiline}
                    {...props}
                />

                {(title === "Password" || title === "Confirm Password") && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;