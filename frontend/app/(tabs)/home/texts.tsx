import React, { useContext, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { View, Text, FlatList, Image, RefreshControl, Platform, Alert, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import EmptyState from '@/components/EmptyState';
import { UserContext } from '@/components/UserContext';
import TextCapsoool, { TextData } from '@/components/TextCapsoool';
import CustomButton from '@/components/CustomButton';
import { buttonStyle } from '@/constants/mystyles';
import { fetchData } from '@/functions/fetchData';
import { DataContext } from '@/components/DataContext';
import UserInfo from '@/components/UserInfo';
/**
 * TextsCapule Component
 * 
 * The TextsCapule component is responsible for displaying user-specific content including texts, 
 * trusted contacts, and provides functionalities to edit and delete texts.
 * 
 * @component
 * @example
 * return (
 *   <TextsCapule />
 * )
 */

function TextsCapule() {
  const { user } = useContext(UserContext);
  const { allData } = useContext(DataContext);

  const [texts, trustedPersons, videos, image] = allData || [[], [], [], []];

  // State hooks
  const [data, setData] = useState<TextData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);



  // Form state
  const [form, setForm] = useState({
    id: 0,
    title: '',
    recipients: '',
    content: '',
  });

  const url = `http://localhost:5000/home/${user?.id}`;

  // Fetch data when the component mounts or user changes
  useEffect(() => {
    fetchData(url, setData, setIsLoading);
  }, [user]);

  /**
   * Refresh control callback
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  /**
   * Opens the modal to edit a specific text item
   * @param {TextData} item - The text item to be edited
   */
  const openItem = (item: TextData) => {
    setForm({
      id: item.id,
      title: item.title,
      recipients: item.recipients,
      content: item.content,
    });
    setIsModalVisible(true);
  };

  /**
   * Prompts user to delete a specific text item
   * @param {TextData} item - The text item to be deleted
   */
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

  /**
   * Handles the deletion of a text item
   * @param {TextData} item - The text item to be deleted
   */
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

  /**
   * Handles the update of a text item
   */
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
    <SafeAreaView className={workArea} edges={['right', 'left', 'bottom']}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: TextData }) => (
          <TextCapsoool data={item} onPressItem={() => openItem(item)} 
            onLongPressItem={() => deleteItem(item)}
          />
        )}
        ListHeaderComponent={() => (
          <UserInfo user={user} trustedPersons={trustedPersons} />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Create your first capsoool"
            subtitle="No capsoools yet"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {/* 
        Modal for editing text capsoool 
      */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <View className='w-full bg-light_primary rounded-t-lg p-5 mt-24 h-screen rounded-tl-[30] rounded-tr-[30]'>
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
          >
            <Text className='text-white'>Close</Text>
          </TouchableOpacity>
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

export default TextsCapule;