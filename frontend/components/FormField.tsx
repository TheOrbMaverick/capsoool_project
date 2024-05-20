import { View, Text, TextStyle, Platform, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from 'react-native'
import React from 'react'
import { useState } from "react";
import { icons } from "../constants";

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

    const fieldWidth = Platform.OS !== 'web' ? `w-full h-16 px-4 bg-black-100 rounded-2xl 
     border-2 border-black-200 focus:border-secondary 
     flex flex-row items-center` : `w-2/4 h-16 px-4 bg-black-100 rounded-2xl 
     border-2 border-black-200 focus:border-secondary 
     flex flex-row items-center`;

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