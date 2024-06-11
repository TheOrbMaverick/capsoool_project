import * as Contacts from 'expo-contacts';
import { Alert, Linking } from 'react-native';

export const requestPermissions = async (setContacts:(data: any) => void, setError: (data: any) => void) => {
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