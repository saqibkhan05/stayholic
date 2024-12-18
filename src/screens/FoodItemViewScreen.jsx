import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import LoadingScreen from './LoadingScreen';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const FoodItemViewScreen = ({ navigation, route }) => {
    const { id } = route.params;  // Assuming the food item data is passed via route params

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [customerData, setCustomerData] = useState();
    const [amount, setAmount] = useState(0);

    // Check login status function
    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');

        if (token) {
            try {
                const c_response = await axios.post('https://stayholic.com/api/v1/customer/wallet', {
                    token, token
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                // Assuming you want to set customerData from the response
                const tempCustomerData = c_response.data;
                setCustomerData(tempCustomerData)
                console.log(tempCustomerData);

                const abc = parseInt(tempCustomerData.wallet.balance) - parseInt(tempCustomerData.wallet.min_balance);
                setAmount(abc);

                if (!tempCustomerData.customer.status) {
                    Alert.alert('Error', 'You Have to Become a Tenant First');
                }

            } catch (error) {
                Alert.alert('Error', 'Something went wrong while checking login status');
                console.error(error); // Log the error for debugging purposes
            }
        } else {
            Alert.alert('Error', 'You Have to Login First');
        }
    };

    // useEffect Hook
    useEffect(() => {

        const fetchFoodDetail = async () => {
            try {
                const response = await axios.get(`https://stayholic.com/api/v1/food/${id}`);
                setData(response.data);
                console.log(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setLoading(false);
            }
        };
        fetchFoodDetail();
        checkLoginStatus();
    }, [id]);

    const [paymentMethod, setPaymentMethod] = useState('wallet'); // default payment method

    const handleWalletPayment = () => {
        if (amount >= data.cost) {
            Alert.alert('Payment Success', `Paid ₹${data.cost} from wallet.`);
        } else {
            Alert.alert('Insufficient Balance', 'You do not have enough balance in your wallet.');
        }
    };

    const handleRazorpayPayment = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                user_id: customerData.customer.id,
                amount: data.cost * 100,
                note: 'Order Food'
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            const options = {
                description: 'Order Food',
                image: 'https://stayholic.com/public/logo/logo.jpeg',
                currency: 'INR',
                key: rz_response.data.key, // Your api key
                amount: data.cost * 100,
                name: customerData.customer.name,
                order_id: rz_response.data.order_id,
                prefill: {
                    email: customerData.customer.email,
                    contact: customerData.customer.phone,
                    name: customerData.customer.name
                },
                theme: { color: '#545454' }
            }

            RazorpayCheckout.open(options).then((dataa) => {
                const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_order_food', {
                    razorpay_payment_id: dataa.razorpay_payment_id,
                    razorpay_order_id: dataa.razorpay_order_id,
                    foodId: data.id,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                navigation.navigate('ProFileNavigation');
            }).catch((error) => {
                alert(`Error: ${error.code} | ${error.description}`);
            });
        }
        else {
            Alert.alert('Error', 'You Have to Login First');
        }
    };

    const handleOrderNow = () => {
        if (paymentMethod === 'wallet') {
            handleWalletPayment();  // Call wallet payment function
        } else if (paymentMethod === 'razorpay') {
            handleRazorpayPayment();  // Call Razorpay payment function
        }
    };

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: data.images[0].file_path }} style={styles.image} />
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.description}>
                    Indulge in the perfect meal, crafted to delight your taste buds with every bite.
                </Text>
                <Text style={styles.price}>Price: ₹{data.cost}</Text>

                <View style={styles.paymentSection}>
                    <Text style={styles.paymentTitle}>Select Payment Method</Text>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'wallet' && styles.selected, amount < data.cost && styles.disabled]}
                        onPress={() => amount >= data.cost && setPaymentMethod('wallet')}
                        disabled={amount < data.cost}
                    >
                        <Text style={styles.paymentText}>Wallet-Pay</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'razorpay' && styles.selected]}
                        onPress={() => setPaymentMethod('razorpay')}
                    >
                        <Text style={styles.paymentText}>Razorpay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomSection}>
                <Text style={styles.totalPrice}>₹{data.cost}</Text>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
                    <Text style={styles.orderButtonText}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FoodItemViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c', // Dark background
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Light text color for dark theme
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#bbb', // Light text color
        marginBottom: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Light text color
        marginBottom: 20,
    },
    paymentSection: {
        marginTop: 30,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // Light text color
        marginBottom: 15,
    },
    paymentOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#333', // Dark background for options
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#444', // Darker selected background
        borderColor: '#007bff',
        borderWidth: 2,
    },
    paymentText: {
        fontSize: 16,
        color: '#fff', // Light text color
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#444', // Dark border color
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff', // Light text color
    },
    orderButton: {
        backgroundColor: '#28a745', // Green button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    orderButtonText: {
        color: '#fff', // Light text color
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabled: {
        backgroundColor: '#555', // Disabled state color
        borderColor: '#999',
    },
});
