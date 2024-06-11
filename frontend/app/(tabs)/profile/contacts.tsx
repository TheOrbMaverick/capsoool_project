import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactList, { ContactData } from '@/components/ContactList';
import { requestPermissions } from '@/functions/requestpermissions';

export default function Contact() {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [error, setError] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    requestPermissions(setContacts, setError);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      requestPermissions(setContacts, setError);  // Retry fetching contacts on refresh
    }, 2000);
    setRefreshing(false)
  }, []);

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ContactList data={item} onPressItem={() => console.log(item)} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}
