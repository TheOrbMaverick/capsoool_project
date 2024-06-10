import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileLayout() {
  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
        <Stack screenOptions={{ headerShown: false }}/>
    </SafeAreaView>

  );
}