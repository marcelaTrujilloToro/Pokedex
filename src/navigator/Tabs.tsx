/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tab1} from './Tab1';
import Icon from 'react-native-vector-icons/Ionicons';
import {Tab2Screen} from './Tab2';

const Tab = createBottomTabNavigator();

export const TabsComponent = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856d6',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderWidth: 0,
          height: 90,
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={Tab1}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={30} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={Tab2Screen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={30} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
