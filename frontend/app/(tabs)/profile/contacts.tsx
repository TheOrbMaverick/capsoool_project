import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, RefreshControl } from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactList, { ContactData } from '@/components/ContactList';


export default function Contact() {
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [error, setError] = useState<string>("")
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
            setContacts(data)
        }
        else {
            setError("No contacts found")
        }
      }
    })();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
        <FlatList
            data={contacts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }: { item: ContactData }) => (
            <ContactList data={item} onPressItem={() => console.log(item)}/>
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});