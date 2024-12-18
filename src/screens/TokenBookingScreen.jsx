import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://yourapi.com/api/v1'; // Replace with your actual API URL

const TokenBookingScreen = ({ navigation }) => {
    const [hasTokenMoney, setHasTokenMoney] = useState(false); // To track if user has token money
    const [loading, setLoading] = useState(true); // To handle loading state
    const [tokenAmount, setTokenAmount] = useState(0); // To store the token amount from API
    const [roomId, setRoomId] = useState(); // To store the token amount from API

    const [customerData, setCustomerData] = useState({});
    const [Kycverified, setKycverified] = useState(false);

    // Check if the user is logged in and get their data
    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const customer_data = response.data;
            setCustomerData(customer_data);
            setKycverified(customer_data.kyc_verified);
        }
    };
    useEffect(() => {
        checkLoginStatus();
    }, []);
    useEffect(() => {
        // Function to check token balance from the API
        const checkTokenBalance = async () => {
            try {
                const response = await axios.post(`https://stayholic.com/api/v1/hasTokenAmount/${customerData.id}`);
                console.log(response.data);
                if (response.data.token) {

                    setHasTokenMoney(true);
                    setTokenAmount(response.data.token_amount); // Set token amount if available
                    setRoomId(response.data.room_id);
                } else {
                    setHasTokenMoney(false); // No token available
                }
            } catch (error) {
                console.error('Error fetching token balance:', error.message);
            } finally {
                setLoading(false); // Set loading to false once the API call completes
            }
        };
        checkTokenBalance(); // Call the function on screen load
    }, [customerData]);

    // Proceed to payment function
    const proceedToPayment = () => {
        // Redirect or open payment gateway
        console.log('Proceeding to payment');

        navigation.navigate('PgRoomPaymentPage', { roomId })
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Token Booking</Text>

            {hasTokenMoney ? (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Token Balance Available</Text>
                    <Text style={styles.tokenAmount}>₹{tokenAmount}</Text>

                    <TouchableOpacity onPress={proceedToPayment}>
                        <LinearGradient
                            colors={['#00b4cc', '#00698c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Proceed to Payment</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.noTokenMessage}>
                    <Text style={styles.noTokenText}>
                        You don't have any token money.{"\n"}
                        <Text style={styles.linkText}>Go book your PG now!</Text>
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212', // Dark background
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    card: {
        backgroundColor: '#1e1e1e',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    cardTitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 10,
    },
    tokenAmount: {
        fontSize: 36,
        color: '#00b4cc',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noTokenMessage: {
        alignItems: 'center',
    },
    noTokenText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    linkText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 20,
        color: '#fff',
    },
});

export default TokenBookingScreen;
