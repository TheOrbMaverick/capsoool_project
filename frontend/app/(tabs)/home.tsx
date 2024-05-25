import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, Image, RefreshControl, Platform, Alert, Modal, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { UserContext } from '@/components/UserContext';
import TextCapsoool, { TextData } from '@/components/TextCapsoool';
import CustomButton from '@/components/CustomButton';
import { buttonStyle, containerStyle, signupText } from '@/constants/mystyles';
import { fetchData } from '@/functions/fetchData';

function Home() {
  const [data, setData] = useState<TextData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRender, setIsRender] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false)

  const { user } = useContext(UserContext);

  const url = `http://localhost:5000/home/${user?.id}`

  const [form, setForm] = useState({
    title: '',
    recipients: '',
    content: '',
  });

  const editText = async () => {

    try {
      const response = await fetch(`http://localhost:5000/home/${user?.id}/createtext`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: form.title,
          recipients: form.recipients,
          content: form.content,
          author_id: user?.id
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result)
        Alert.alert('Success', 'You have created a text Capsoool!');
        setIsModalVisible(false)
        router.push('/home');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to sign up');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  }

  useEffect(() => {
    fetchData(url, setData, setIsLoading);
  }, [url, setData, setIsLoading]);

  // useFocusEffect(
  //   useCallback(() => {
  //     fetchData(url, setData, setIsLoading);
  //   }, [url, setData, setIsLoading])
  // );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(url, setData, setIsLoading);
    setRefreshing(false);
  };

  const openItem = () => {
    console.log("you pressed the button");
    setIsModalVisible(true)
    // router.push('/create');
  };

  const workArea = Platform.OS === 'web' ? 'bg-primary h-full pl-16 pr-16 pt-8' : 'bg-primary h-full';

  return (
    <SafeAreaView className={workArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TextCapsoool data={item} onPressItem={openItem} />
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
                Your latest Capsoools
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} />
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalVisible(!isModalVisible);
        }}>
          <View className='w-full bg-light_primary rounded-t-lg p-5 mt-24
          h-screen rounded-tl-[30] rounded-tr-[30]'>
            <Text
              className='text-2xl text-white text-center mt-10'
            >
              Edit Your Capsoool Message
            </Text>

            <FormField
              title='title'
              value={form.title}
              handleChangeText={(e) => setForm({ ...form, title: e })}
              otherStyles='mt-8'
            />

            <FormField
              title='recipients'
              value={form.recipients}
              handleChangeText={(e) => setForm({ ...form, recipients: e })}
              otherStyles='mt-8'
            />

            <FormField
              title='your message:'
              value={form.content}
              handleChangeText={(e) => setForm({ ...form, content: e })}
              otherStyles='mt-8 mb-8'
            />

            <CustomButton
              title='Edit Capsoool'
              handlePress={() => setIsModalVisible(false)}
              containerStyles={buttonStyle}
            />
          </View>
        </Modal>
    </SafeAreaView>
  );
}

export default Home;
