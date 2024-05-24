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

  const handleSignUp = async () => {

    if (!form.title) {
      Alert.alert("Please enter a title for this Capsoool");
      return;
    }

    if (!form.content) {
      Alert.alert("Please enter a message you'd like to leave behind");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/home/createtext', {
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
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text
            className='text-2xl text-white
            text-semibold mt-10 font-psemibold'
          >
            Sign up to Capsoool
          </Text>

          <FormField
            title='title'
            value={form.title}
            handleChangeText={(e) => setForm({ ...form, title: e })}
            otherStyles='mt-7'
          />

          <FormField
            title='recipients'
            value={form.recipients}
            handleChangeText={(e) => setForm({ ...form, recipients: e })}
            otherStyles='mt-7'
          />

          <View className={'space-y-2 mt-10'}>
            <Text className="text-base text-gray-100 font-pmedium">Your Message:</Text>
      
            <View className={fieldWidth}>
              <TextInput
                className="flex-1 text-white font-psemibold text-base mt-7 h-300"
                value={form.content}
                placeholder="Hey sweetheart..."
                multiline
                placeholderTextColor="#7B7B8B"
                onChangeText={(e) => setForm({ ...form, content: e })}
              />
            </View>

          </View>

          <CustomButton
            title='Create'
            handlePress={handleSignUp}
            containerStyles={buttonStyle}
          />

          <View className={signupText}>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link
              href="/login"
              className='text-lg font-psemibold text-secondary'
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
