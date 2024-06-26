import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { images } from '@/constants';

interface RecipientComponent {
    id: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    tp_image?: string;
    created_at?: string;
    updated_at?: string;
    author_id?: number;
}

interface RecipientProps {
    recipient: RecipientComponent[];
}

interface RecipientItemProps {
    item: RecipientComponent;
    onlongPressItem: () => void
}

const defaultRecipient: RecipientComponent[] = [
    { id: 4, first_name: 'add a recipient', last_name: '', tp_image: images.add_user.toString() }
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
                        source={item.first_name === 'add a recipient' ? images.add_user : { uri: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' } }
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
