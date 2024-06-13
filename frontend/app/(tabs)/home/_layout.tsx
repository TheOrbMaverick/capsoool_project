import React from 'react';
import { Platform } from 'react-native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const isWeb = Platform.OS === 'web';

const _layout = () => {

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
