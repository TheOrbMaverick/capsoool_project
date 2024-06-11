import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Modal, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactList, { ContactData } from '@/components/ContactList';
import { requestPermissions } from '@/functions/requestpermissions';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { buttonStyle } from '@/constants/mystyles';

export default function Contact() {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [error, setError] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form, setForm] = useState({
    id: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  });

  useEffect(() => {
    requestPermissions(setContacts, setError);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      requestPermissions(setContacts, setError);  // Retry fetching contacts on refresh
    }, 2000);
  }, []);

  const openItem = (item: ContactData) => {
    setForm({
      id: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      phoneNumber: item.phoneNumber,
      email: item.email,
    });
    setIsModalVisible(true);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactList data={item} onPressItem={() => openItem(item)} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(!isModalVisible)}
      >
        <View className='flex-1 justify-end'>
          <View className='w-full bg-light_primary rounded-t-lg p-5 h-5/6 rounded-tl-[30] rounded-tr-[30]'>
            <ScrollView showsVerticalScrollIndicator={false} >
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
              >
                <Text className='text-white'>Close</Text>
              </TouchableOpacity>
              <Text className='text-2xl text-white text-center mt-10'>
                Add Recipient
              </Text>
              <FormField
                title='first name'
                value={form.firstName}
                handleChangeText={(e) => setForm({ ...form, firstName: e })}
                otherStyles='mt-8'
              />
              <FormField
                title='last name'
                value={form.lastName}
                handleChangeText={(e) => setForm({ ...form, lastName: e })}
                otherStyles='mt-8'
              />
              <FormField
                title='phone number'
                value={form.phoneNumber}
                handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
                otherStyles='mt-8'
              />
              <FormField
                title='email'
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles='mt-8 mb-8'
              />
              <CustomButton
                title='Save Recipient'
                handlePress={() => { console.log('saved') }}
                containerStyles={buttonStyle}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
