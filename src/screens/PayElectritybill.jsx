import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';

const PayElectritybill = ({ navigation }) => {

    const [customerData, setCustomerData] = useState({});
    const [rent, setRent] = useState(false);

    // Check if the user is logged in and get their data
    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const customer_data = response.data;
            setCustomerData(customer_data);
        }
    };

    const getData = async () => {

        // Replace with your API URL
        const response = await axios.post('https://stayholic.com/api/v1/electricity_notification', {
            c_id: customerData.id
        });

        setRent(response.data.rent)
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);
    useEffect(() => {
        getData();
    }, [customerData]);

    useEffect(() => {
        handlePayment();
    }, [rent])

    const handlePayment = async (roomId) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            console.log(token);

            const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                user_id: customerData.id,
                amount: rent * 100,
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
                amount: rent * 100,
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
                const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_electricity_paid', {
                    razorpay_payment_id: data.razorpay_payment_id,
                    razorpay_order_id: data.razorpay_order_id,
                    rent: rent,
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


    return (
        <View>
        </View>
    )
}

export default PayElectritybill

const styles = StyleSheet.create({})