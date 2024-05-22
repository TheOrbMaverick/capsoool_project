import { View, Text, ScrollView, Image, Platform, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { Link } from 'expo-router';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [currentUser, setCurrentUser] = useState({})

  const login = async () => {
    router.push('/home');
    const { email, password } = form;
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Use the user data as needed
        // console.log('User Data:', result.user);

        setCurrentUser(result.user)

        // Navigate to the home page
      } else {
        Alert.alert('Error', result.error || 'Invalid email or password');
      }
    }
    catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const buttonStyle = Platform.OS !== 'web' ? 'w-full mt-7' : 'w-2/4 mt-7';
  const containerStyle = Platform.OS === 'web'
    ? 'w-full md:w-3/4 justify-center h-full px-4 my-24 mx-auto'
    : 'w-full justify-center h-full px-4 my-6';
  const signupText = Platform.OS !== 'web' ? 'flex justify-center pt-5 flex-row gap-2' 
    : "flex pt-5 flex-row gap-2";

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
            Login to Capsoool
          </Text>

          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles='mt-7 mb-8'
          />

          <CustomButton
            title='Login'
            handlePress={login}
            containerStyles={buttonStyle}
          />

          <View className={signupText}>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link
              href="/signup"
              className='text-lg font-psemibold text-secondary'
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
