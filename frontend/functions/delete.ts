import { TextData } from "@/components/TextCapsoool";
import { fetchData } from "./fetchData";
import { Alert } from "react-native";
import { useState } from "react";
import { User, } from "@/components/contexts/UserContext";


export const deleteItem = (item: TextData, user: User | null, setData?: (data: any) => void) => {
    Alert.alert(
      'Delete',
      'Do you want to delete this capsoool?',
      [
          {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel'
          },
          {
              text: 'Delete',
              onPress: () => handleDelete(item, user, setData),
              style: 'destructive'
          }
      ]
    );
};


export const handleDelete = async (item: TextData, user: User | null, setData?: (data: any) => void) => {
try {
    const url = `http://localhost:5000/home/${user?.id}/text/${item.id}`;
    const method = 'DELETE';

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const result = await response.json();
    console.log('Item deleted:', result);
    Alert.alert('Success', 'The item has been deleted.');
    const fetchUrl = `http://localhost:5000/home/${user?.id}`;
    await fetchData(fetchUrl, setData);
} catch (error) {
    console.error('Error deleting item:', error);
    Alert.alert('Error', 'There was a problem deleting the item.');
}
};