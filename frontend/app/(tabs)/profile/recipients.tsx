import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

const Recipients = () => {
  
  return (
    <SafeAreaView className='bg-primary flex-1'>
      <ScrollView >
        <View className='pl-8'>
          <Text className='text-2xl font-semibold text-white'>Recipients</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Recipients