import React, { useContext } from 'react';
import { View, Platform, Text, Image } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import UserInfo from '@/components/UserInfo'; // Adjust the import path as needed
import { UserContext } from '@/components/UserContext'; // Adjust the import path as needed
import { images } from '@/constants'; // Adjust the import path as needed
import { DataContext } from '@/components/DataContext';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const isWeb = Platform.OS === 'web';

const _layout = () => {
  const { user } = useContext(UserContext);
  const { allData } = useContext(DataContext);

  const [trustedPersons] = allData || [[]];

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA001',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' },
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarIndicatorStyle: { backgroundColor: '#FFA001', height: 3 },
        tabBarStyle: {
          display: isWeb ? 'none' : 'flex',
          backgroundColor: '#161622',
        },
      }}
    >
      <MaterialTopTabs.Screen name='videos' options={{ title: "Videos" }} />
      <MaterialTopTabs.Screen name='images' options={{ title: "Images" }} />
      <MaterialTopTabs.Screen name='texts' options={{ title: "Texts" }} />
    </MaterialTopTabs>
  );
};

export default _layout;
