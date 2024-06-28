import { View, Text, ScrollView, Image, Platform, Alert, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { buttonStyle, containerStyle } from '@/constants/mystyles';
import { UserContext } from '@/components/contexts/UserContext';
import Recipients from '@/components/Recipients';
import { DataContext } from '@/components/contexts/DataContext';

export default function TextCreate() {

  const [form, setForm] = useState({
    title: '',
    recipients: '',
    content: '',
  });

  const { user } = useContext(UserContext);

  const { allData } = useContext(DataContext);
  const [texts, trusted, video, image, recipient] = allData || [[], [], [], [], []];

  const createText = async () => {

    const { title, recipients, content } = form;
    if (!title) {
      Alert.alert("Please enter a title for this Capsoool");
      return;
    }

    if (!recipients) {
      Alert.alert("Please enter the recepients of your message");
      return;
    }

    if (!content) {
      Alert.alert("Please enter a message you'd like to leave");
      return;
    }

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
          authorId: user?.id
        })
      });

      if (response.ok) {
        Alert.alert('Success', 'You have created a text Capsoool!');
        router.push('/home/texts');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to create text Capsoool up');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full" edges={['right', 'left']}>
      <ScrollView className="px-4 my-6">
        <View className='w-full justify-center h-full'>
          <Text
            className='text-2xl text-white
            text-semibold font-psemibold'
          >
            Text capsoool
          </Text>

          <FormField
            title='Title'
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles='mt-8'
          />

          <Text className='mt-10 text-base text-gray-100 font-pmedium'>Recipients:</Text>
          <Recipients recipient={recipient}/>

          <FormField
            title='Your message:'
            value={form.content}
            handleChangeText={(e) => setForm({ ...form, content: e })}
            otherStyles='mt-8 mb-8'
          />

          <CustomButton
            title='Text Create'
            handlePress={createText}
            containerStyles={buttonStyle}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
