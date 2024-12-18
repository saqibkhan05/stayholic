import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Share, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from './LoadingScreen';

// Constants for easy API management
const API_URL = 'https://stayholic.com/api/v1';

const RefrelCodeScreen = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [customerData, setCustomerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const navigation = useNavigation();

    // Check login status and get customer data
    const checkLoginStatus = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                const response = await axios.post(`${API_URL}/customer/me`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCustomerData(response.data);
                setIsLoggedIn(true);
            } else {
                console.log('User not logged in');
            }
        } catch (error) {
            console.error('Error fetching customer data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch coupon data for the logged-in customer
    const fetchCoupon = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token && customerData.id) {
                const response = await axios.post(`${API_URL}/myCoupon/${customerData.id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCouponCode(response.data.coupon.name);
            }
        } catch (error) {
            console.error('Error fetching coupon data:', error.message);
        }
    };

    // Share referral code
    const onShare = async () => {
        try {
            await Share.share({
                message: `Here's my referral code: ${couponCode}. Use it to get exciting benefits!`,
            });
        } catch (error) {
            alert('Error sharing referral code: ' + error.message);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (isLoggedIn && customerData.id) fetchCoupon();
    }, [isLoggedIn, customerData]);

    if (loading) return <LoadingScreen />;

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <LinearGradient
                    colors={['#333333', '#444444']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                >
                    <Icon name="arrow-back" size={24} color="#fff" />
                    <Text style={styles.backButtonText}>Go Back</Text>
                </LinearGradient>
            </TouchableOpacity>

            {/* Referral Code Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Your Referral Code</Text>
                <Text style={styles.code}>{couponCode}</Text>

                <TouchableOpacity onPress={onShare}>
                    <LinearGradient
                        colors={['#71b100', '#71b100']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.shareButton}
                    >
                        <Text style={styles.shareButtonText}>Share Code</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default RefrelCodeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff', // Light text for dark theme
        marginBottom: 10,
    },
    code: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff', // Light text for dark theme
        marginBottom: 30,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    gradientButton: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    shareButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 20,
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
