import React, { useEffect, useState } from 'react';
import { View, Text, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;

const Videos = () => {

  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <ScrollView>
        <View>
          <Text className='font-pmedium text-sm text-gray-100'>images</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Videos;