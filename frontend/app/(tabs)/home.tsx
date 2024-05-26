import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, RefreshControl, Platform, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
// import Trending from '@/components/Trusted';
import EmptyState from '@/components/EmptyState';
import { UserContext } from '@/components/UserContext';
import TextCapsoool, { TextData } from '@/components/TextCapsoool';
import CustomButton from '@/components/CustomButton';
import { buttonStyle } from '@/constants/mystyles';
import { fetchData } from '@/functions/fetchData';

function Home() {
  const { user } = useContext(UserContext);

  const [data, setData] = useState<TextData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);


  const [form, setForm] = useState({
    id: 0,
    title: '',
    recipients: '',
    content: '',
  });

  const url = `http://localhost:5000/home/${user?.id}`;

  useEffect(() => {
    fetchData(url, setData, setIsLoading);
  }, [user]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const openItem = (item: TextData) => {
    setForm({
      id: item.id,
      title: item.title,
      recipients: item.recipients,
      content: item.content,
    });
    setIsModalVisible(true);
  };

  const deleteItem = (item: TextData) => {
    Alert.alert(
      'Delete',
      'Do you want to delete this capsoool?',
      [
          {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
          },
          {
              text: 'Delete',
              onPress: () => handleDelete(item),
              style: 'destructive'
          }
      ]
  );
  };

  const handleDelete = async (item: TextData) => {
    try {
        const url = `http://localhost:5000/home/${user?.id}/text/${item.id}`;
        const method = 'DELETE';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Item deleted:', result);
        Alert.alert('Success', 'The item has been deleted.');
    } catch (error) {
        console.error('Error deleting item:', error);
        Alert.alert('Error', 'There was a problem deleting the item.');
    }
  };

  const editText = async () => {
    try {
      const url = `http://localhost:5000/home/${user?.id}/text/${form.id}`;
      const method = 'PUT';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          recipients: form.recipients,
          content: form.content,
          author_id: user?.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        Alert.alert('Success', `You have updated your text Capsoool!`);
        setIsModalVisible(false);
        const fetchUrl = `http://localhost:5000/home/${user?.id}`;
        await fetchData(fetchUrl, setData, setIsLoading); // Refresh data after edit
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to update text Capsoool');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  const workArea = Platform.OS === 'web' ? 'bg-primary h-full pl-16 pr-16 pt-8' : 'bg-primary h-full';

  return (
    <SafeAreaView className={workArea}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: TextData }) => (
          <TextCapsoool data={item} onPressItem={() => openItem(item)} 
            onLongPressItem={() => deleteItem(item)}
          />
        )}
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
                Add your trusted people
              </Text>

              {/* <Trending trusted_person={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []} /> */}
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
        onRequestClose={() => setIsModalVisible(!isModalVisible)}>
        <View className='w-full bg-light_primary rounded-t-lg p-5 mt-24 h-screen rounded-tl-[30] rounded-tr-[30]'>
          <Text className='text-2xl text-white text-center mt-10'>
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
            handlePress={editText}
            containerStyles={buttonStyle}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Home;
