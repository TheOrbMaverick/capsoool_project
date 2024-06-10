import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

interface AppContact {
  id: string;
  name: string;
}

export default function Contact() {
  const [contact, setContact] = useState<AppContact | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contactData = data[0];

          // Ensure contactData has an id and a name
          if (contactData.id && contactData.name) {
            const formattedContact: AppContact = {
              id: contactData.id,
              name: contactData.name,
            };
            setContact(formattedContact);
          }
        }
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {contact ? (
        <View>
          <Text>Name: {contact.name}</Text>
        </View>
      ) : (
        <Text>No contact selected</Text>
      )}
    </View>
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