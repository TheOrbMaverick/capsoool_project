import { SafeAreaView, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import ContactList from '@/components/ContactList'
import { DataContext, Trusted } from '@/components/contexts/DataContext';

const trusted_people = () => {

  const { allData } = useContext(DataContext);
  const [texts, trusted] = allData || [[], []];
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Form state
  const [form, setForm] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  /**
 * Opens the modal to edit a specific text item
 * @param {TextData} item - The text item to be edited
 */
  const openItem = (item: Trusted) => {
    setForm({
      id: item.id.toString(),
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email
    });
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView className='bg-primary flex-1'>
      <FlatList
        data={trusted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactList data={item} onPressItem={() => openItem(item)} />
        )}
      />
    </SafeAreaView>
  )
}

export default trusted_people