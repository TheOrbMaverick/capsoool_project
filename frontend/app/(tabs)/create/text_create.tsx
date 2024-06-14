import { View, Text, ScrollView, Image, Platform, Alert, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { buttonStyle, containerStyle, signupText } from '@/constants/mystyles';
import { UserContext } from '@/components/contexts/UserContext';

export default function TextCreate() {

  const [form, setForm] = useState({
    title: '',
    recipients: '',
    content: '',
  });

  const { user } = useContext(UserContext);

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
          author_id: user?.id
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
    <SafeAreaView className='bg-primary h-full' edges={['right', 'left', 'bottom']}>
      <ScrollView>
        <View className={containerStyle}>
          <Text
            className='text-2xl text-white
            text-semibold mt-4 font-psemibold'
          >
            Enter your time capsule message
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
            title='Text Create'
            handlePress={createText}
            containerStyles={buttonStyle}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
