import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export interface ContactData {
  id: number;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email: string;
}

interface ContactItemData {
  data: ContactData;
  onPressItem: () => void;
}

const ContactList: React.FC<ContactItemData> = ({ data, onPressItem }) => {
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View className='w-full pb-1 pt-2 border-b-2 border-black-200'>
        <Text className='font-psemibold ml-4 text-white'>{data.first_name} {data.last_name}</Text>
        <Text className='text-gray-100 ml-4 text-sm font-regular mb-3'>{data.phone_number} {data.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactList;