import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { useState } from "react";
import { icons } from "../constants";
import { fieldWidth } from '@/constants/mystyles';

interface FormField {
    title: string;
    value: string,
    placeholder?: string;
    handleChangeText?: (text: string) => void;
    otherStyles?: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean
  }

const FormField: React.FC<FormField>= ({ title, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const [showPassword, setShowPassword] = useState(false);

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