import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, Platform, Alert, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import EmptyState from '@/components/EmptyState';
import { UserContext } from '@/components/contexts/UserContext';
import TextCapsoool from '@/components/TextCapsoool';
import CustomButton from '@/components/CustomButton';
import { buttonStyle } from '@/constants/mystyles';
import { fetchData } from '@/functions/fetchData';
import { DataContext } from '@/components/contexts/DataContext';
import { deleteItem } from '@/functions/delete';
import { router } from 'expo-router';
import { TextData } from '@/components/contexts/DataContext';

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

  const [texts] = allData || [[]];

  // State hooks
  const [updatedText, setUpdatedText] = useState();
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
    fetchData(url, setUpdatedText, setIsLoading);
    isLoading
  }, [texts]);

  /**
   * Refresh control callback
   */
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Fetch data when the component mounts or user changes
      fetchData(url, setUpdatedText);
    }, 2000);
    setRefreshing(false);
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
   * Handles the update of a text item
   */
  const editText = async () => {
    try {
      const editurl = `http://localhost:5000/home/${user?.id}/text/${form.id}`;
      const method = 'PUT';
      const response = await fetch(editurl, {
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
        Alert.alert('Success', `You have updated your text Capsoool!`);
        setIsModalVisible(false);
        
        setTimeout(() => {
          fetchData(url, setUpdatedText);
        }, 1000);
        
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
        data={updatedText}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: TextData }) => (
          <TextCapsoool data={item} onPressItem={() => openItem(item)} 
            onLongPressItem={() => deleteItem(item, user, setUpdatedText)}
          />
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