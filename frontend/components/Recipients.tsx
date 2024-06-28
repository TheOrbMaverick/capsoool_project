import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '@/constants';

interface RecipientComponent {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    tp_image?: string;
    createdAt?: string;
    updatedAt?: string;
    authorId?: number;
}

interface RecipientProps {
    recipient: RecipientComponent[];
}

interface RecipientItemProps {
    item: RecipientComponent;
    onlongPressItem: () => void
}

const defaultRecipient: RecipientComponent[] = [
    { id: '4', firstName: 'add a recipient', lastName: '', tp_image: images.add_user.toString() }
];

const RecipientItem: React.FC<RecipientItemProps> = ({ item, onlongPressItem }) => {
    return (
        <View className='mr-2'>
            <TouchableOpacity
            onLongPress={onlongPressItem}
            >
                <View className='rounded p-5 items-center'>
                    <View className="w-[46px] h-[46px] mb-2 rounded-lg border border-secondary flex justify-center p-0.5">
                        <Image
                        source={item.firstName === 'add a recipient' ? images.add_user : { uri: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' } }
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

const Recipients: React.FC<RecipientProps> = ({ recipient }) => {
    const combinedRecipients = [...recipient, ...defaultRecipient];

    return (
        <FlatList
            data={combinedRecipients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <RecipientItem item={item} onlongPressItem ={() => {}} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default Recipients;
