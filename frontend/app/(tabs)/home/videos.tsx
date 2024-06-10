import { DataContext } from '@/components/contexts/DataContext';
import EmptyState from '@/components/EmptyState';
import TextCapsoool, { TextData } from '@/components/TextCapsoool';
import { UserContext } from '@/components/contexts/UserContext';
import UserInfo from '@/components/UserInfo';
import { deleteItem } from '@/functions/delete';
import { fetchData } from '@/functions/fetchData';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Animated, ScrollView, Alert } from 'react-native';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 50;

const Videos = () => {
  const { user } = useContext(UserContext);
  const { allData } = useContext(DataContext);

  const [texts, trustedPersons, videos, image] = allData || [[], [], [], []];

  console.log(texts)

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

  return (
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
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
    </SafeAreaView>
  );
};

export default Videos;
