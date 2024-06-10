import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'

const images = () => {
  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <ScrollView>
        <View>
          <Text className='font-pmedium text-sm text-gray-100'>images</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default images