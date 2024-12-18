import { StyleSheet, Text, Image, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Keyboard } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import HotelScreen from '../screens/HotelScreen';
import WalletScreen from '../screens/WalletScreen';
import FoodScreen from '../screens/FoodScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ProFileNavigation from './ProFileNavigation';
import About from '../screens/About';

const BottomNavigation = () => {
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const Tab = createBottomTabNavigator();

    return (
        <>
            <StatusBar backgroundColor="#1C1C1C" barStyle="light-content" />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: keyboardVisible
                        ? { display: 'none' }
                        : {
                            backgroundColor: '#000',
                            borderTopColor: 'transparent',
                            height: 60,
                            paddingBottom: 8,
                        },
                    tabBarInactiveTintColor: '#fff', // Lighter gray for inactive icons
                    tabBarActiveTintColor: '#fff', // White for active icons
                }}
            >
                <Tab.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        title: 'home',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon2 name={focused ? 'home' : 'home-outline'} size={focused ? 25 : 22} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="HotelScreen"
                    component={HotelScreen}
                    options={{
                        title: 'home',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon name={focused ? 'building' : 'building-o'} size={focused ? 25 : 22} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="walletScreen"
                    component={WalletScreen}
                    options={{
                        title: 'home',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon2 name={focused ? 'wallet' : 'wallet-outline'} size={focused ? 25 : 22} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="FoodScreen"
                    component={FoodScreen}
                    options={{
                        title: 'home',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon2 name={focused ? 'fast-food' : 'fast-food-outline'} size={focused ? 25 : 22} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ProFileNavigation"
                    component={ProFileNavigation}
                    options={{
                        title: 'home',
                        tabBarIcon: ({ color, focused }) => (
                            <Icon name={focused ? 'user' : 'user-o'} size={focused ? 25 : 22} color={color} />
                        ),
                    }}
                />

                {/* About screen hidden in tab */}
                <Tab.Screen
                    name="About"
                    component={About}
                    options={{ tabBarButton: () => null, tabBarVisible: false }}
                />
            </Tab.Navigator>
        </>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
