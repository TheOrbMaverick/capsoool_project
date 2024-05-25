import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function TabLayout() {
  const isWeb = Platform.OS === 'web';
  
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        headerShown: false,
        tabBarStyle: {
          display: isWeb ? 'none' : 'flex',
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84
        },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          title: 'Saved',
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'save' : 'save-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'create' : 'create-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          unmountOnBlur: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
