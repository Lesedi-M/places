import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen/HomeScreen";
import FavouriteScreen from "../Screen/FavouriteScreen/FavouriteScreen";
import ProfileScreen from "../Screen/ProfileScreen/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Utils/Colors";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Search",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Favourite",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
        name="favourite"
        component={FavouriteScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
        name="profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
