import { View, Text, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '@/constants';

export interface TrustedPerson {
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    tp_image?: string;
    author_id?: number;
}

interface TrustedProps {
    trusted_person: TrustedPerson[];
}

interface TrustedItemProps {
    item: TrustedPerson;
}

const defaultTrustedPersons: TrustedPerson[] = [
    { id: 4, first_name: 'add trusted person', last_name: '', tp_image: images.add_user.toString() }, 
    { id: 5, first_name: 'add trusted person', last_name: '', tp_image: images.add_user.toString() },
    { id: 6, first_name: 'add trusted person', last_name: '', tp_image: images.add_user.toString() }
];

const TrustedItem: React.FC<TrustedItemProps> = ({ item }) => {
    return (
        <View className='mr-2'>
            <TouchableOpacity
            >
                <View className='rounded p-5 items-center mb-5'>
                    <View className="w-[46px] h-[46px] mb-2 rounded-lg border border-secondary flex justify-center p-0.5">
                        <Image
                        source={item.first_name === 'add trusted person' ? images.add_user : { uri: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' } }
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                        />
                    </View>
                    <Text className='text-white font-pextralight'>{item.first_name} {item.last_name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const Trusted: React.FC<TrustedProps> = ({ trusted_person }) => {
    const combinedTrustedPersons = [...trusted_person, ...defaultTrustedPersons].slice(0, 3);

    return (
        <FlatList
            data={combinedTrustedPersons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <TrustedItem item={item} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Trusted;
