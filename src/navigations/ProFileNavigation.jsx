import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from '../screens/user/ProfileScreen';
import WalletTransaction from '../screens/WalletTransaction';
import BankTransaction from '../screens/BankTransaction';
import Notifications from '../screens/Notifications';
import ProfileUpdateScreen from '../screens/user/ProfileUpdateScreen';
import MyRoom from '../screens/user/MyRoom';
import TermsAndConditionsScreen from '../screens/TermsAndConditionsScreen';
import KycScreen from '../screens/user/KycScreen';
import Logout from '../screens/user/Logout';
import HelpAndSupport from '../screens/HelpAndSupport';
import TokenBookingScreen from '../screens/TokenBookingScreen';

const ProFileNavigation = () => {

    const Stack = createNativeStackNavigator();
    return (
        <>
            <StatusBar backgroundColor="#3D3B40" barStyle="light-content" />
            <Stack.Navigator screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: '#3D3B40', // Set header background color
                },
                headerTintColor: '#fff', // Set header text color (e.g., white)
            }}>
                <Stack.Screen
                    name='My Profile'
                    component={ProfileScreen}
                />
                <Stack.Screen
                    name='WalletTransaction'
                    component={WalletTransaction}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Wallet Transactions',
                    }}
                />

                <Stack.Screen
                    name='BankTransaction'
                    component={BankTransaction}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Transactions From Bank',
                    }}
                />

                <Stack.Screen
                    name='Notifications'
                    component={Notifications}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Notifications',
                    }}
                />

                <Stack.Screen
                    name='ProfileUpdateScreen'
                    component={ProfileUpdateScreen}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Profile Update',
                    }}
                />


                <Stack.Screen
                    name='MyRoom'
                    component={MyRoom}
                    options={{
                        headerShown: true,  // Show header
                        title: 'MyRoom',
                    }}
                />


                <Stack.Screen
                    name='TermsAndConditionsScreen'
                    component={TermsAndConditionsScreen}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Terms And Conditions',
                    }}
                />


                <Stack.Screen
                    name='KycScreen'
                    component={KycScreen}
                    options={{
                        headerShown: true,  // Show header
                        title: 'KYC',
                    }}
                />

                <Stack.Screen
                    name='Logout'
                    component={Logout}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Logout',
                    }}
                />

                <Stack.Screen
                    name='HelpAndSupport'
                    component={HelpAndSupport}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Help And Support',
                    }}
                />

                <Stack.Screen
                    name='TokenBookingScreen'
                    component={TokenBookingScreen}
                    options={{
                        headerShown: true,  // Show header
                        title: 'Help And Support',
                    }}
                />
            </Stack.Navigator>
        </>
    )
}

export default ProFileNavigation

const styles = StyleSheet.create({})