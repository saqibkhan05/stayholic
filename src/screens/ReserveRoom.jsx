import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';
import Occupancy from '../components/small/Occupancy';
import RazorpayCheckout from 'react-native-razorpay';

const ReserveRoom = ({ navigation, route }) => {

    const { roomId } = route.params;
    console.log(roomId);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const [customerData, setCustomerData] = useState({})


    const fetchPropertyDetail = async () => {
        try {
            const response = await axios.get(`https://stayholic.com/api/v1/room/${roomId}`);
            setData(response.data);
            console.log(response.data);

            // Set Loader False
            setLoading(false);
        } catch (error) {
            console.error('Error fetching locations:', error);
            setLoading(false);
        }
    };

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const c_response = await axios.post('https://stayholic.com/api/v1/customer/wallet', {
                token, token
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            setCustomerData(c_response.data.customer)
        }
        else {
            Alert.alert('Error', 'You Have to Login First');
        }
    }

    useEffect(() => {
        fetchPropertyDetail();
        checkLoginStatus();
    }, []);

    const handlePayment = async (roomId) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            console.log(token);
            
            const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                user_id: customerData.id,
                amount: 5000 * 100,
                note: 'Renting a Room in PG'
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // 
            console.log(rz_response.data.order_id);

            const options = {
                description: 'Renting a Room in PG',
                image: 'https://stayholic.com/public/logo/logo.jpeg',
                currency: 'INR',
                key: rz_response.data.key, // Your api key
                amount: 5000 * 100,
                name: customerData.name,
                order_id: rz_response.data.order_id,
                prefill: {
                    email: customerData.email,
                    contact: customerData.phone,
                    name: customerData.name
                },
                theme: { color: '#545454' }
            }
            // 
            RazorpayCheckout.open(options).then((data) => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
                const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_token_amount', {
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    roomId: roomId,
                    token_amount: 5000,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );
                navigation.navigate('ProFileNavigation');
                // Alert.alert('Success', 'Proceeding to payment.');

            }).catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
        }
        else {
            Alert.alert('Error', 'You Have to Login First');
        }
    }

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View style={styles.container}>
            {/* Logo at the top */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: data.room.images[0].file_path }} style={{ width: 80, height: 80, borderRadius: 10 }} />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.itemBoldLabel}>{data.room.pg.name}</Text>
                        <Text style={{ color: '#fff' }}>
                            <Occupancy data={data} />
                        </Text>
                        <Text style={{ color: '#fff' }}>Room Number : {data.room.room_name}</Text>
                    </View>
                </View>

                <View style={styles.separator} />

                <View style={{ marginBottom: 15 }}>
                    <Text style={{ color: '#fff' }}>Prefer not to pay the full amount upfront?</Text>
                    <Text style={{ color: '#fff' }}>Secure your reservation today with a token payment!</Text>
                    {/* <Text style={{ color: '#fff' }}>Token Money is Not Refundable</Text> */}
                </View>

                <View style={styles.itemContainer}>
                    <Text style={styles.itemLabel}>Token Amount:</Text>
                    <Text style={styles.itemValue}>₹5,000</Text>
                </View>

                <View style={styles.separator} />
                <View style={styles.itemContainer}>
                    <Text style={styles.totalLabel}>Total Payable:</Text>
                    <Text style={styles.totalValue}>₹5,000</Text>
                </View>

            </ScrollView>

            {/* Bottom Bar with Pay Now Button */}
            <View style={styles.bottomBar}>
                <Text style={styles.payableAmount}>Total Payable: ₹5,000</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { handlePayment(roomId) }}
                >
                    <Text style={styles.buttonText}>Pay Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ReserveRoom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',  // Dark background color
    },

    scrollContainer: {
        padding: 20,
        paddingBottom: 100, // To avoid overlap with the bottom bar
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemLabel: {
        fontSize: 16,
        color: '#fff',  // Light text for dark theme
    },
    itemBoldLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',  // Light text for dark theme
    },
    itemValue: {
        fontSize: 16,
        color: '#fff',  // Light text for dark theme
    },
    separator: {
        height: 1,
        backgroundColor: '#444',  // Darker separator
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',  // Light text for dark theme
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',  // Light text for dark theme
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkboxContainer: {
        marginRight: 10,
    },
    termsText: {
        fontSize: 14,
        color: '#fff',  // Light text for dark theme
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#1f1f1f',  // Dark bottom bar
        borderTopWidth: 1,
        borderTopColor: '#444',  // Dark separator
    },
    payableAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',  // Light text for dark theme
    },
    button: {
        backgroundColor: '#71b100',  // Purple button color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',  // Light text for dark theme
        fontSize: 16,
        fontWeight: 'bold',
    },
});
