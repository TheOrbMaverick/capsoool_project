import { View, Text, Image, Platform } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'


interface EmptyState {
    title: string
    subtitle: string
}

const buttonStyle = Platform.OS !== 'web' ? 'w-full mt-7' : 'w-2/4 mt-7';

const EmptyState: React.FC<EmptyState>= ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-4'>
        <Image
        source={images.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
        />

        <Text className='text-xl text-center font-psemibold text-white mt-2'>
            {title}
        </Text>
        <Text className='font-pmedium text-sm text-gray-100'>
            {subtitle}
        </Text>

        <CustomButton
        title='Create Capsoool'
        handlePress={() =>{router.push('/create')}}
        containerStyles={buttonStyle}
        />

    </View>
  )
}

export default EmptyState
