import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import Transaction from '../small/Transaction';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../screens/LoadingScreen';
import TransactionBank from '../small/TransactionBank';

const TransactionCardBank = ({ navigation }) => {

    const [loading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);
    const [walletData, setWalletData] = useState([])

    const getdata = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/all_transactions', {
                token, token
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Handle the response
            console.log(response.data);
            setWalletData(response.data)

        }
        else {
            setWalletData({ 'balance': 5, 'min_balance': 0 })
        }
    }

    const refreshDataHandel = async () => {
        setRefreshing(true)
        getdata();
        setRefreshing(false)
    }

    useFocusEffect(
        React.useCallback(() => {
            const checkLoginStatus = async () => {
                try {
                    const isLogin = await AsyncStorage.getItem('isLogin');
                    if (isLogin === 'true') {
                        console.log('User is logged in');
                        setLoading(false); // Stop loading if logged in
                    } else {
                        console.log('User is not logged in');
                        setLoading(false); // Stop loading if not logged in
                        navigation.navigate('SignInScreen'); // Navigate to SignIn if not logged in
                    }
                } catch (error) {
                    console.error('Error checking login status:', error);
                    setLoading(false); // Stop loading if an error occurs
                }
            };

            checkLoginStatus();
            getdata();

            return () => {
                // Optional cleanup if necessary when screen is unfocused
            };
        }, [navigation]) // Add navigation dependency to ensure it's up to date
    );

    // loading screen
    if (loading) {
        return <LoadingScreen />
    }
    // Main Screen
    return (
        <>
            <View style={styles.transactionsCard}>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refreshDataHandel}
                        />
                    }
                    data={walletData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <TransactionBank transaction={item} />}
                />
            </View>
        </>
    );
};

export default TransactionCardBank

const styles = StyleSheet.create({
    transactionsCard: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        // borderRadius: 0,
        padding: 20,
    },
    transactionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Light text color
        marginBottom: 10,
    },
    transactionItem: {
        backgroundColor: '#1f1f1f', // Dark background for each item
        borderRadius: 8,
        marginBottom: 10,
        padding: 15,
    },
    transactionText: {
        color: '#fff', // Light text color for transaction details
    },
})