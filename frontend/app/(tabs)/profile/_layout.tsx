import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, ScrollView, Text, TouchableOpacity } from "react-native";
import { images } from "@/constants";
import { UserContext } from "@/components/UserContext";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center items-center h-full">
          <Image
            source={images.profile}
            className="w-[84px] h-[84px] mb-8 rounded-2xl"
            resizeMode="contain"
          />

          <Text className="text-2xl font-psemibold text-white">
            {user?.first_name} {user?.last_name}
          </Text>

          <Text className="text-gray-100 text-lg font-regular mb-20">
            {user?.email}
          </Text>

          <View className="w-full pb-3 pt-3 border-b-2 border-t-2 border-black-200">
            <TouchableOpacity onPress={() => router.push('/profile/recipients')}>
              <Text className="text-gray-100 text-lg font-regular font-psemibold ml-4">
                Trusted People
              </Text>
            </TouchableOpacity>
          </View>
          <View className="w-full pb-3 pt-3 border-b-2 border-black-200">
            <TouchableOpacity onPress={() => router.push('/recipients')}>
              <Text className="text-gray-100 text-lg font-regular font-psemibold ml-4">
                Recipients
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;