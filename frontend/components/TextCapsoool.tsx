import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

// Define the type for the text data
export interface TextData {
    id: number;
    title: string;
    content: string;
    recipients: string;
    created_at: string;
    updated_at: string;
    author_id: number;
}

// Define the props for the component
interface TextComponentProps {
    data: TextData;
    onPressItem: () => void
}

const TextCapsoool: React.FC<TextComponentProps> = ({ data, onPressItem }) => {
    return (
        <TouchableOpacity onPress={onPressItem}>
            <View key={data.id} className='mb-10 pl-4 pr-16 flex-1 rounded-3xl'>
                <Text className='text-2xl font-psemibold text-white'>{data.title}</Text>
                <Text className='text-gray-100 text-sm font-regular mb-3'>Recipients: {data.recipients}</Text>
                <Text className='text-white text-lg font-regular mb-3'>{data.content}</Text>
                <Text className='text-gray-100 text-sm font-regular mb-3'>Created At: {data.created_at.toString()}</Text>
                <Text className='text-gray-100 text-sm font-regular mb-3'>Last Updated: {data.updated_at.toString()}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TextCapsoool;
