import { View, Text, Image, ScrollView, Platform } from 'react-native';
import { NativeWindStyleSheet } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '@/components/CustomButton';

NativeWindStyleSheet.setOutput({
  default: "native"
});

const containerStyles = Platform.OS !== 'web' ? 'w-full mt-7' : 'w-2/4 mt-7';

export default function HomeScreen() {

  return (
    <SafeAreaView className='bg-primary h-full'>

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Time with{" "}
              <Text className="text-secondary-200">Capsoool</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Leave Videos, Images and Messages for your loved ones after you're gone.
            Don't leave your loved ones guessing
          </Text>

          <CustomButton
            title='Continue with Email'
            handlePress={() => router.push('/login')}
            containerStyles={containerStyles}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
