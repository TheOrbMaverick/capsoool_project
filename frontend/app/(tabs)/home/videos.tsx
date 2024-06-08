import { View, Text} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'

const videos = () => {
  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <View>
        <Text className='font-pmedium text-sm text-gray-100'>videos</Text>
      </View>
    </SafeAreaView>
  )
}

export default videos