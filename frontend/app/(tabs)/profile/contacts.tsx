import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, RefreshControl, Alert, Linking } from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactList, { ContactData } from '@/components/ContactList';

export default function Contact() {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [error, setError] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);

  const requestPermissions = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          const formattedContacts = data.map(contact => ({
            id: contact.id || '',
            firstName: contact.firstName || '',
            lastName: contact.lastName || '',
            phoneNumber: contact.phoneNumbers?.[0]?.number || '',
            email: contact.emails?.[0]?.email || ''
          }));
          setContacts(formattedContacts);
        } else {
          setError("No contacts found");
        }
      } else {
        setError("Permission to access contacts was denied. Retrying...");
      }
    } catch (err) {
      setError("An error occurred while requesting contacts permissions.");
      Alert.alert(
        "Permission Required",
        "This app needs access to your contacts. Please go to settings and enable permissions.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ]
      );
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      requestPermissions();  // Retry fetching contacts on refresh
    }, 2000);
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
