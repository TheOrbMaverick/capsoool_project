import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

export interface ContactData {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
}

interface ContactItemData {
    data: ContactData,
    onPressItem: () => void
}

const ContactList: React.FC<ContactItemData> = ({data, onPressItem}) => {
  return (
    <TouchableOpacity onPress={onPressItem}>
      <View>
        <Text className='font-psemibold text-white'>{data.firstName} {data.lastName}</Text>
        <Text className='text-gray-100 text-sm font-regular mb-3'>{data.phoneNumber} {data.email}</Text>
      </View>
    </TouchableOpacity>
    );
}

export default ContactList