import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { ImageData } from "./contexts/DataContext";

import { icons } from "../constants";

  
const ImageCapsoool: React.FC<ImageData> = ({ filename, filepath, recipients, created_at }) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mt-6 mb-2">
        <View className="flex flex-row gap-3 items-start">
            <View className="flex justify-center items-center flex-row flex-1">
                <View className="flex justify-center flex-1 ml-1 gap-y-1">
                    <Text
                    className="font-psemibold text-sm text-white"
                    numberOfLines={1}
                    >
                    {filename}
                    </Text>
                    <Text
                    className="text-xs text-gray-100 font-pregular"
                    numberOfLines={1}
                    >
                    {recipients}
                    </Text>
                </View>
            </View>

            <View className="pt-2">
                <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
            </View>
        </View>

        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPlay(true)}
            className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
            <Image
            source={{ uri: filepath }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
            />
        </TouchableOpacity>

        <View className=" w-full mt-4">
            <Text className="text-xs text-gray-100 ml-1 font-pregular"
                numberOfLines={1}
            >
                Created: {created_at.toString()}
            </Text>
        </View>
    </View>
  );
};

export default ImageCapsoool;