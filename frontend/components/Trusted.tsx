import { View, Text, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '@/constants'; // Adjust the path to your actual images file

interface TrustedPerson {
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
    { id: 1, first_name: 'add trusted person', last_name: '', tp_image: images.add_user.toString() }, 
    { id: 2, first_name: 'add trusted person', last_name: '', tp_image: images.add_user.toString() },
    { id: 3, first_name: 'add trusted person', last_name: '', tp_image: images.add_user.toString() }
];

const TrustedItem: React.FC<TrustedItemProps> = ({ item }) => {
    return (
        <View style={{ marginRight: 20 }}>
            <TouchableOpacity>
                <View className='border-light_primary rounded p-2 items-center'>
                    <Image
                        className='w-auto h-14 justify-center mt-0 pt-0'
                        source={item.first_name === 'add trusted person' ? images.add_user : { uri: item.tp_image } }
                        resizeMode='contain'
                    />
                    <Text className='text-white font-psemibold'>{item.first_name} {item.last_name}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const Trusted: React.FC<TrustedProps> = ({ trusted_person }) => {
    // Combine the default trusted persons with the provided ones, replacing default ones as needed
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
