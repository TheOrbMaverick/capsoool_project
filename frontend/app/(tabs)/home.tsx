import React from 'react'
import {View, Text, FlatList, Image, RefreshControl, Platform} from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import { useState } from 'react'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'

interface Item {
  id: number;
}

function Home() {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () =>{
    setRefreshing(true)
    //check for new capsools
    setRefreshing(false)
  }

  const [form, setForm] = useState({
    lastName: ''
  });

  const workArea = Platform.OS === 'web' ? 'bg-primary h-full pl-16 pr-16 pt-8' : 'bg-primary h-full'

  const data: Item[] = [{ id: 1 }, { id: 4 }, { id: 3 }];
  return (
    <SafeAreaView className={workArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className='text-3xl text-white' text-white>{item.id}</Text>
          // <VideoCard
          //   title={item.title}
          //   thumbnail={item.thumbnail}
          //   video={item.video}
          //   creator={item.creator.username}
          //   avatar={item.creator.avatar}
          // />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  Ita Enang
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                className='w-9 h-10'
                source={images.logoSmall}
                resizeMode='contain'
                />
              </View>
            </View>

            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-regular mb-3'>
                Yout latest Capsoools
              </Text>

              <Trending posts={[{ id: 1}, { id: 2 }, { id: 3 }] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Create your first capsoool"
            subtitle="No capsoools yet"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  )
}

export default Home
