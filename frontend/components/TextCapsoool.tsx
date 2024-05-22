import React from 'react';
import { View, Text } from 'react-native';

// Define the type for the text data
interface TextData {
    id: number;
    title: string;
    content: string;
    recipients: string;
    created_at: Date;
    updated_at: Date;
    author_id: number;
}

// Define the props for the component
interface TextComponentProps {
    data: TextData[];
}

const TextComponent: React.FC<TextComponentProps> = ({ data }) => {
    return (
        <View>
            {data.map((text) => (
                <View key={text.id} className='mb-20 b-1 p-10'>
                    <Text className='text-2xl font-psemibold text-white'>{text.title}</Text>
                    <Text className='text-gray-100 text-lg font-regular mb-3'>{text.content}</Text>
                    <Text className='text-gray-100 text-lg font-regular mb-3'>Recipients: {text.recipients}</Text>
                    <Text className='text-gray-100 text-lg font-regular mb-3'>Created At: {text.created_at.toString()}</Text>
                    <Text className='text-gray-100 text-lg font-regular mb-3'>Last Updated: {text.updated_at.toString()}</Text>
                </View>
            ))}
        </View>
    );
};

export default TextComponent;