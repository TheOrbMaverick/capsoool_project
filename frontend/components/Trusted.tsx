import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '@/constants';

export interface TrustedPerson {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    tp_image?: string;
    authorId?: number;
}

interface TrustedProps {
    trusted_person: TrustedPerson[];
}

interface TrustedItemProps {
    item: TrustedPerson;
}

const defaultTrustedPersons: TrustedPerson[] = [
    { id: '4', firstName: 'add trusted person', lastName: '', tp_image: images.add_user.toString() }, 
    { id: '5', firstName: 'add trusted person', lastName: '', tp_image: images.add_user.toString() },
    { id: '6', firstName: 'add trusted person', lastName: '', tp_image: images.add_user.toString() }
];

const TrustedItem: React.FC<TrustedItemProps> = ({ item }) => {
    return (
        <View className='mr-2'>
            <TouchableOpacity
            >
                <View className='rounded p-5 items-center mb-5'>
                    <View className="w-[46px] h-[46px] mb-2 rounded-lg border border-secondary flex justify-center p-0.5">
                        <Image
                        source={item.firstName === 'add trusted person' ? images.add_user : { uri: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' } }
                        className="w-full h-full rounded-lg"
                        resizeMode="cover"
                        />
                    </View>
                    <Text className='text-white font-pextralight'>{item.firstName} {item.lastName}</Text>
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
