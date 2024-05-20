import { View, Text, ScrollView, Image, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { Link } from 'expo-router';

export default function SignUp() {

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const buttonStyle = Platform.OS !== 'web' ? 'w-full mt-7' : 'w-2/4 mt-7';

  const containerStyle = Platform.OS === 'web'
    ? 'w-full md:w-3/4 justify-center h-full px-4 my-24 mx-auto'
    : 'w-full justify-center h-full px-4 my-6';

  const signupText = Platform.OS !== 'web'? 'flex justify-center pt-5 flex-row gap-2' 
    : "flex pt-5 flex-row gap-2"

  const handleSignUp = async () => {

    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password
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
            title='First name'
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles='mt-7'
          />

          <FormField
            title='Last Name'
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles='mt-7'
          />

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
            otherStyles='mt-7'
          />

          <FormField
            title='Confirm Password'
            value={form.confirmPassword}
            handleChangeText={(e: string) => setForm({ ...form, confirmPassword: e })}
            otherStyles='mt-7 mb-8'
          />

          <CustomButton
            title='SignUp'
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
