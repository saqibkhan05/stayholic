import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/big/TopBar';
import WalletCard from '../components/small/WalletCard';
import TransactionCard from '../components/big/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

const WalletScreen = ({ navigation }) => {

    const [walletData, setWalletData] = useState({ 'balance': 0, 'min_balance': 0 })
    const [customerData, setCustomerData] = useState({})
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [amount, setAmount] = useState('');

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const getdata = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/wallet', { token },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Handle the response
            console.log('Wallet Data:', response.data);
            setWalletData(response.data.wallet)
            setCustomerData(response.data.customer)
        } else {
            setWalletData({ 'balance': 0, 'min_balance': 0 })
        }
    }

    const refreshDataHandel = async () => {
        setRefreshing(true)
        getdata();
        setRefreshing(false)
    }

    const handleAddMoney = async () => {
        if (amount) {
            console.log('Amount to Add:', amount);
            const token = await AsyncStorage.getItem('token');
            const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                user_id: customerData.id,
                amount: amount * 100,
                note: 'Add Money To Wallet'
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log(rz_response.data.order_id);

            const options = {
                description: 'Credits towards consultation',
                image: 'https://stayholic.com/public/logo/logo.jpeg',
                currency: 'INR',
                key: rz_response.data.key, // Your api key
                amount: amount * 100,
                name: customerData.name,
                order_id: rz_response.data.order_id,
                prefill: {
                    email: customerData.email,
                    contact: customerData.phone,
                    name: customerData.name
                },
                theme: { color: '#545454' }
            }

            RazorpayCheckout.open(options).then((data) => {
                // handle success
                const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_wallet_update', {
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                getdata();
            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });

            toggleModal(); // Close modal after adding money
        } else {
            console.log('Please enter an amount');
        }
    };

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

    const withdrawhandler = () => {
        Alert.alert('Note', 'For Withdraw The Money You Have To Fill The Room Leaving Notice');
    }

    // loading screen
    if (loading) {
        return <LoadingScreen />
    }

    // Main Screen
    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={refreshDataHandel}
                />
            }
        >
            <View style={styles.flex}>
                <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'baseline' }}>
                    <Text style={styles.title2}>  Wallet</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('ProFileNavigation', { screen: 'WalletTransaction' }) }}>
                    <Icon name="wallet-outline" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />

            {/* Top Section - Wallet Cards */}
            <View style={styles.topSection}>
                <WalletCard title="Security Money" amount={walletData.min_balance} />
                <WalletCard title="Wallet Money" amount={parseInt(walletData.balance) - parseInt(walletData.min_balance)} />
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleModal} >
                    <Icon name="add-circle-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Add Money</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.withdrawButton]} onPress={withdrawhandler}>
                    <Icon name="remove-circle-outline" size={20} color="#fff" />
                    <Text style={styles.buttonText}>Withdraw Money</Text>
                </TouchableOpacity>
            </View>

            {/* Modal for Adding Money */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Money to Wallet</Text>

                        {/* Input for Amount */}
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />

                        {/* Add Money Button */}
                        <TouchableOpacity onPress={handleAddMoney} style={styles.AddButton}>
                            <Text style={styles.closeButtonText}>Add Money</Text>
                        </TouchableOpacity>

                        {/* Close Modal Button */}
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',  // Dark background color
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',  // White text for dark theme
        marginBottom: 10
    },
    title2: {
        fontWeight: 'bold',
        color: '#fff',  // Lighter accent color for dark theme
        marginBottom: 10,
        fontSize: 20,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#71b100',  // Dark theme button color
        padding: 15,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
    },
    withdrawButton: {
        backgroundColor: '#71b100',  // Red color for withdraw button
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#121212',  // Dark background for modal
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#2c2c2c',  // Dark input background
        color: '#fff',  // White text for input
        fontSize: 16,
        padding: 10,
        marginBottom: 20,
        borderRadius: 8,
    },
    AddButton: {
        backgroundColor: '#719330',  // Button color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#e53935',  // Red close button
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#2c2c2c',
        marginVertical: 20,
    },
});

export default WalletScreen;
