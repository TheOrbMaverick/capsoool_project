import { View, Text, ScrollView, Image, Platform, Alert, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { Link } from 'expo-router';
import { buttonStyle, containerStyle, signupText } from '@/constants/mystyles';
import { TextInput } from 'react-native-gesture-handler';
import { fieldWidth } from '@/constants/mystyles';
import { UserContext } from '@/components/UserContext';

export default function Create() {

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
        const result = await response.json();
        Alert.alert('Success', 'You have signed up successfully!');
        router.push('/home');
      } else {
        const error = await response.json();
        Alert.alert('Error', error.message || 'Failed to sign up');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className={containerStyle}>
          <Text
            className='text-2xl text-white
            text-semibold mt-10 font-psemibold'
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
            title='Create'
            handlePress={() => {createText}}
            containerStyles={buttonStyle}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
