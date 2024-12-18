import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
    const menuItems = [
        { id: 1, title: 'Profile', description: 'Update your personal information', icon: 'person-outline', screen: 'ProfileUpdateScreen' },
        { id: 2, title: 'My Room', description: 'Your Room at StayHolic', icon: 'home-outline', screen: 'MyRoom' },
        { id: 9, title: 'Token Booking', description: 'Your Token Amount Booking', icon: 'help-circle-outline', screen: 'TokenBookingScreen' },
        { id: 3, title: 'Wallet Transaction', description: 'Previous Payments from Wallet', icon: 'card-outline', screen: 'WalletTransaction' },
        { id: 4, title: 'Payment History', description: 'Previous Payments Direct from Bank', icon: 'card-outline', screen: 'BankTransaction' },
        { id: 5, title: 'KYC', description: 'Quick, Simple and Secure Process', icon: 'document-outline', screen: 'KycScreen' },
        { id: 6, title: 'Notifications', description: 'Control your notification preferences', icon: 'notifications-outline', screen: 'Notifications' },
        { id: 7, title: 'Terms and Conditions', description: 'Must Read T&C', icon: 'newspaper-outline', screen: 'TermsAndConditionsScreen' },
        { id: 8, title: 'Help & Support', description: 'Get help and find FAQs', icon: 'help-circle-outline', screen: 'HelpAndSupport' },
    ];


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.profileHeader}>
                    <Text style={styles.profileName}>My Menu</Text>
                </View>

                <View style={styles.separator}></View>

                {/* Menu Items */}
                {menuItems.map(item => (
                    <View key={item.id} style={styles.menuItemContainer}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(item.screen)}>
                            <View style={styles.menuIcon}>
                                <Icon name={item.icon} size={22} color="#fff" />
                            </View>
                            <View style={styles.menuTextContainer}>
                                <Text style={styles.menuTitle}>{item.title}</Text>
                                <Text style={styles.menuDescription}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* Separator Line */}
                    </View>
                ))}

                {/* Logout Option */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => { navigation.navigate('Logout') }}>
                    <View style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <Icon name="log-out-outline" size={30} color="red" />
                        </View>
                        <View style={styles.menuTextContainer}>
                            <Text style={[styles.menuTitle, { color: 'red' }]}>Logout</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Spacer to prevent hiding under bottom tab */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
    },
    scrollViewContent: {
        paddingBottom: 50, // To give space below
    },
    profileHeader: {
        // alignItems: 'center',
        marginHorizontal: 25,
        marginVertical: 10
    },
    profileName: {
        fontSize: 20,
        fontWeight: '500',
        color: '#FFFFFF', // White text
        marginTop: 10,
    },
    profileEmail: {
        fontSize: 16,
        color: '#B0B0B0', // Light gray text
    },
    menuItemContainer: {
        marginBottom: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#1E1E1E', // Darker background for items
        borderRadius: 10,
        marginHorizontal: 20,
    },
    menuIcon: {
        marginRight: 15,
    },
    menuTextContainer: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 14,
        color: '#FFFFFF', // White text for titles
    },
    menuDescription: {
        fontSize: 12,
        color: '#fff', // Light gray text for descriptions
    },
    separator: {
        height: 1,
        backgroundColor: '#333333', // Dark gray separator line
        marginHorizontal: 20,
        marginVertical: 10,
    },
    logoutButton: {
        marginTop: 20,
    },
    bottomSpacer: {
        height: 100, // Extra space to avoid hiding under bottom tab
    },
});
