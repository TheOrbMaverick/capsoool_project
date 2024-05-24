import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, RefreshControl, Platform, Alert, Modal, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { UserContext } from '@/components/UserContext';
import TextCapsoool, { TextData } from '@/components/TextCapsoool';
import CustomButton from '@/components/CustomButton';
import { buttonStyle, containerStyle, signupText } from '@/constants/mystyles';


function Home() {
  const [data, setData] = useState<TextData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRender, setIsRender] = useState(false)


  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`http://localhost:5000/home/${user?.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  const onRefresh = async () => {
    setRefreshing(true);
    // Check for new capsools
    setRefreshing(false);
  };

  const  openItem = () => {
    console.log("you pressed the button")
    router.push('/create')
  }

  const workArea = Platform.OS === 'web' ? 'bg-primary h-full pl-16 pr-16 pt-8' : 'bg-primary h-full';

  return (
    <SafeAreaView className={workArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TextCapsoool data ={item} onPressItem={openItem}/>
        )}
        extraData={isRender}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  {user?.first_name} {user?.last_name}
                </Text>
                <Text className='text-gray-100 text-lg font-regular mb-3'>
                  {user?.email}
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
