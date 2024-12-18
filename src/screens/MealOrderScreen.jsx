import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StartToEnd from '../components/small/StartToEnd';
import SelectDateComponent from '../components/small/SelectDateComponent';
import RazorpayCheckout from 'react-native-razorpay';
import moment from 'moment';

const MealOrderScreen = ({ navigation, route }) => {

    const { paymentMethod, mealId } = route.params

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);

    const [customerData, setCustomerData] = useState();
    const [amount, setAmount] = useState(0);

    // 
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
        const fetchPropertyDetail = async () => {
            try {
                const response = await axios.get(`https://stayholic.com/api/v1/meal/${mealId}`);
                setData(response.data);
                console.log(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setLoading(false);
            }
        };
        fetchPropertyDetail();
        checkLoginStatus();
    }, [mealId]);


    const [mealpaymentMethod, setMealPaymentMethod] = useState('wallet'); // default payment method

    const handleWalletPayment = () => {
        // Handle wallet payment logic here
        if (amount >= data.cost_pm) {
            Alert.alert('Payment Success', `Paid ₹${data.cost_pm} from wallet.`);
        } else {
            Alert.alert('Insufficient Balance', 'You do not have enough balance in your wallet.');
        }
    };

    const handleRazorpaymonthlyPayment = async () => {

        // Get current date and time
        const currentTime = moment();
        const comparisonTime = moment(data.last_order_timing, 'HH:mm:ss');

        let M_startDate = moment();

        if (currentTime.isAfter(comparisonTime)) {
            console.log('ok');
            M_startDate = moment().add(1, 'day')
        }
        else {
            M_startDate = moment();
        }

        // Calculate start and end dates
        const M_endDate = M_startDate.clone().add(1, 'month');


        N_startDate = M_startDate.format('YYYY-MM-DD'); // Outputs the start date in YYYY-MM-DD format
        N_endDate = M_endDate.format('YYYY-MM-DD');   // Outputs the end date in YYYY-MM-DD format



        const token = await AsyncStorage.getItem('token');
        if (token) {
            const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                user_id: customerData.customer.id,
                amount: data.cost_pm * 100,
                note: 'Order Meal'
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
                description: 'Order Meal',
                image: 'https://stayholic.com/public/logo/logo.jpeg',
                currency: 'INR',
                key: rz_response.data.key, // Your api key
                amount: data.cost_pm * 100,
                name: customerData.customer.name,
                order_id: rz_response.data.order_id,
                prefill: {
                    email: customerData.customer.email,
                    contact: customerData.customer.phone,
                    name: customerData.customer.name
                },
                theme: { color: '#545454' }
            }
            // 
            RazorpayCheckout.open(options).then((dataa) => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
                const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_order_meal', {
                    razorpay_payment_id: dataa.razorpay_payment_id,
                    razorpay_order_id: dataa.razorpay_order_id,
                    mealId: data.id,
                    type: paymentMethod,
                    start: N_startDate,
                    end: N_endDate,
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

    const handleRazorpaydaiylPayment = async () => {
        console.log(startDate);
        console.log(endDate);
        console.log(paymentMethod);



        const token = await AsyncStorage.getItem('token');
        if (token) {
            const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                user_id: customerData.customer.id,
                amount: data.cost_pd * numberOfDays * 100,
                note: 'Order Meal'
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
                description: 'Order Meal',
                image: 'https://stayholic.com/public/logo/logo.jpeg',
                currency: 'INR',
                key: rz_response.data.key, // Your api key
                amount: data.cost_pd * numberOfDays * 100,
                name: customerData.customer.name,
                order_id: rz_response.data.order_id,
                prefill: {
                    email: customerData.customer.email,
                    contact: customerData.customer.phone,
                    name: customerData.customer.name
                },
                theme: { color: '#545454' }
            }
            // 
            RazorpayCheckout.open(options).then((dataa) => {
                // handle success
                // alert(`Success: ${data.razorpay_payment_id}`);
                const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_order_meal', {
                    razorpay_payment_id: dataa.razorpay_payment_id,
                    razorpay_order_id: dataa.razorpay_order_id,
                    mealId: data.id,
                    type: paymentMethod,
                    start: startDate,
                    end: endDate,
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

    const handleOrderNow = () => {
        if (mealpaymentMethod === 'wallet') {
            handleWalletPayment();  // Call wallet payment function
        } else if (mealpaymentMethod === 'razorpay') {
            if (paymentMethod === 'monthly') {
                handleRazorpaymonthlyPayment();  // Call Razorpay payment function
            }
            else if (paymentMethod === 'daily') {
                handleRazorpaydaiylPayment();  // Call Razorpay payment function
            }
        }
    };

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numberOfDays, setNumberOfDays] = useState(0);

    // Callback to update date range
    const handleDateRangeChange = (start, end, days) => {
        setStartDate(start);
        setEndDate(end);
        setNumberOfDays(days);

        console.log(startDate);
        console.log(endDate);
        console.log(numberOfDays);
    };

    const handleDateRangeChange2 = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    }


    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View style={styles.container}>

            <Image source={{ uri: data.images[0].file_path }} style={styles.image} />

            <ScrollView contentContainerStyle={styles.content}>

                {paymentMethod == 'monthly' ? <StartToEnd mealId={mealId} /> : <SelectDateComponent givenTime={data.last_order_timing} onDateRangeChange={handleDateRangeChange} />}

                {/* Payment Methods */}
                <View style={styles.paymentSection}>
                    <Text style={styles.paymentTitle}>Select Payment Method</Text>

                    <TouchableOpacity
                        style={[
                            styles.paymentOption,
                            mealpaymentMethod === 'wallet' && styles.selected,
                            amount < data.cost_pm && styles.disabled  // Add disabled style if wallet balance is insufficient
                        ]}
                        onPress={() => amount >= data.cost_pm && setMealPaymentMethod('wallet')}  // Only allow selection if sufficient balance
                        disabled={amount < data.cost_pm}  // Disable the button if the balance is insufficient
                    >
                        <Text style={styles.paymentText}> Wallet-Pay </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, mealpaymentMethod === 'razorpay' && styles.selected]}
                        onPress={() => setMealPaymentMethod('razorpay')}
                    >
                        <Text style={styles.paymentText}> Razorpay</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

            {/* Bottom section for Price and Order Now */}
            <View style={styles.bottomSection}>
                <Text style={styles.totalPrice}>₹{paymentMethod == 'monthly' ? data.cost_pm : data.cost_pd * numberOfDays}</Text>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
                    <Text style={styles.orderButtonText}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MealOrderScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#777',
        marginBottom: 20,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    paymentSection: {
        marginTop: 30,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    paymentOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#d1e7ff',
        borderColor: '#007bff',
        borderWidth: 2,
    },
    paymentText: {
        fontSize: 16,
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    orderButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabled: {
        backgroundColor: '#ccc',  // Grey out the button
        borderColor: '#999',
    },
});
