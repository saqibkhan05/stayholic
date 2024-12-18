import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/big/TopBar';
import Occupancy from '../components/small/Occupancy';
import LoadingScreen from './LoadingScreen';
import PriceOnly from '../components/small/PriceOnly';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const PgRoomPaymentPage = ({ navigation, route }) => {

    const { roomId } = route.params;
    const [selectedValue, setSelectedValue] = useState("1"); // Default selection is 1
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);
    const [payableamount, setPayableAouunt] = useState(0);
    const [securityCost, setSecurityCost] = useState(0);
    const [roomRent, setRoomRent] = useState(0);
    const [customerData, setCustomerData] = useState({})

    // State to hold selected meal IDs and total amount
    const [Meals, setMeals] = useState([])
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    // couponCode
    const [couponCode, setCouponCode] = useState(''); // State for coupon code
    const [coupon, setCoupon] = useState(false); // State for coupon code
    const [discount, setDiscount] = useState(0); // State for discount amount

    // token
    const [hasTokenMoney, setHasTokenMoney] = useState(false); // To track if user has token money
    const [tokenAmountTemp, setTokenAmountTemp] = useState(0); // To store the token amount from API
    const [tokenAmount, setTokenAmount] = useState(0); // To store the token amount from API
    const [tokenRoomId, setTokenRoomId] = useState(); // To store the token amount from API
    const [TokenMoneyandSameRoom, setTokenMoneyandSameRoom] = useState(false); // To track if user has token money


    const handleCheckboxToggle = (meal) => {
        const isSelected = selectedMeals.includes(meal.id);
        let updatedMeals, updatedAmount;

        if (isSelected) {
            // Remove meal and adjust the amount
            updatedMeals = selectedMeals.filter(id => id !== meal.id);
            updatedAmount = totalAmount - parseFloat(meal.cost_pm);
        } else {
            // Add meal and adjust the amount
            updatedMeals = [...selectedMeals, meal.id];
            updatedAmount = totalAmount + parseFloat(meal.cost_pm);
        }

        setSelectedMeals(updatedMeals);
        setTotalAmount(updatedAmount);
        setPayableAouunt(roomRent + securityCost + updatedAmount - discount);
    };

    const handelpayableamount = () => {
        if (selectedValue == "1") {
            setSecurityCost(roomRent);
        }
        else if (selectedValue == "2") {
            setSecurityCost(roomRent * 0.9);
        }
        else if (selectedValue == "3") {
            setSecurityCost(roomRent * 0.8);
        }
        else if (selectedValue == "4") {
            setSecurityCost(roomRent * 0.7);
        }
        else if (selectedValue == "5") {
            setSecurityCost(roomRent * 0.6);
        }
        else if (selectedValue == "6") {
            setSecurityCost(roomRent * 0.5);
        }
        else {
            setSecurityCost(roomRent / 2);
        }
    }

    const fetchPropertyDetail = async () => {
        try {
            const response = await axios.get(`https://stayholic.com/api/v1/room/${roomId}`);
            setData(response.data);

            // Calculate payable amount using the response data
            const roomCost = parseInt(response.data.room.occupancy_cost);
            setRoomRent(roomCost);

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

    const MealApi = async () => {
        const response = await axios.post('https://stayholic.com/api/v1/allmeals');
        setMeals(response.data)
        console.log(response.data);
    }

    useEffect(() => {
        fetchPropertyDetail();
        checkLoginStatus();
        MealApi();
    }, []);
    useEffect(() => {
        // Function to check token balance from the API
        const checkTokenBalance = async () => {

            const response = await axios.post(`https://stayholic.com/api/v1/hasTokenAmount/${customerData.id}`);

            if (response.data.token) {
                setHasTokenMoney(true);
                setTokenAmountTemp(response.data.token_amount);
                setTokenRoomId(response.data.room_id);

            } else {
                setHasTokenMoney(false); // No token available
            }

        };
        checkTokenBalance(); // Call the function on screen load
    }, [customerData]);
    useEffect(() => {
        if (hasTokenMoney && roomId == tokenRoomId) {
            setTokenMoneyandSameRoom(true)
            setTokenAmount(tokenAmountTemp);
        }
    }, [hasTokenMoney, tokenRoomId]);
    useEffect(() => {
        handelpayableamount();
    }, [roomRent, selectedValue, securityCost])
    useEffect(() => {
        console.log("Payable Amount Updated:", payableamount);
    }, [payableamount]);
    useEffect(() => {
        // Recalculate payable amount if rent, security, or total meal cost changes
        setPayableAouunt(roomRent + securityCost + totalAmount - discount - tokenAmount);
    }, [roomRent, securityCost, totalAmount, tokenAmount]);

    const applyCoupon = async () => {
        if (!couponCode) {
            Alert.alert('Error', 'Please enter a coupon code.');
            return;
        }

        try {
            const Coupon_response = await axios.post('https://stayholic.com/api/v1/verifyCoupon', { coupon_code: couponCode });

            if (Coupon_response.data.coupon) {
                const coupon_data = Coupon_response.data.coupon;
                if (coupon_data.coupon_type == 'amount') {
                    const discountAmount = parseFloat(coupon_data.discount);
                    setDiscount(discountAmount);
                    setPayableAouunt(payableamount - discountAmount);
                }
                setCoupon(true);
                Alert.alert('Success', 'Coupon applied successfully!');
            } else {
                Alert.alert('Invalid Coupon', Coupon_response.data.error);
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            Alert.alert('Error', 'Unable to apply coupon.');
        }
    };

    const handlePayment = async (roomId) => {
        if (!isTermsAccepted) {
            Alert.alert('Error', 'Please accept the terms and conditions to proceed.');
        } else {
            // Payment logic goes here
            // Alert.alert('Success', 'Proceeding to payment.');
            const token = await AsyncStorage.getItem('token');

            console.log(selectedMeals);


            if (token) {
                const rz_response = await axios.post('https://stayholic.com/api/paymentcreateOrder', {
                    user_id: customerData.id,
                    amount: payableamount * 100,
                    note: 'Rent PG'
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                );

                const options = {
                    description: 'Rent PG',
                    image: 'https://stayholic.com/public/logo/logo.jpeg',
                    currency: 'INR',
                    key: rz_response.data.key, // Your api key
                    amount: payableamount * 100,
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
                    const rzs_response = axios.post('https://stayholic.com/api/paymentSuccess_room_booking', {
                        razorpay_payment_id: data.razorpay_payment_id,
                        razorpay_order_id: data.razorpay_order_id,
                        roomId: roomId,
                        coupon_code: couponCode,
                        room_rent: roomRent,
                        security_cost: securityCost,
                        discount: discount,
                        months: selectedValue,
                        iscoupon: coupon,
                        selectedMeals: JSON.stringify(selectedMeals),
                        hasTokenMoney: hasTokenMoney,
                        tokenAmount: tokenAmount,
                    },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    );
                    navigation.navigate('AgreementDownloadScreen');
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
    };

    const handleReserve = (roomId) => {
        navigation.navigate('ReserveRoom', { roomId })
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
                        <Text style={{ color: '#fff' }}>Room No.  {data.room.room_name}</Text>
                    </View>
                </View>

                {/*  */}
                <View style={styles.separator} />

                {/* Coupon Code Section */}
                <View>
                    <View style={[styles.couponContainer, { marginVertical: 10 }]}>
                        <TextInput
                            style={styles.couponInput}
                            placeholder="Promo Code"
                            placeholderTextColor="#fff"  // Lighter color for the placeholder text
                            value={couponCode}
                            onChangeText={setCouponCode}
                        />
                        <TouchableOpacity
                            style={[styles.button, coupon && styles.disabledButton]}
                            onPress={applyCoupon}
                            disabled={coupon}
                        >
                            <Text style={styles.applyButtonText}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('AllCouponsScreen') }}
                        >
                            <Text style={{ fontWeight: 'bold', marginLeft: 10, color: '#fff', marginBottom: 10 }}>View Promo Code</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Select Field Section */}
                <View style={styles.selectContainer}>
                    <Text style={styles.selectLabel}>Tenure</Text>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue) => setSelectedValue(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label={"1 Month (Security 100%)"} value={`1`} key={1} />
                        <Picker.Item label={"2 Months (Security 90%)"} value={`2`} key={2} />
                        <Picker.Item label={"3 Months (Security 80%)"} value={`3`} key={3} />
                        <Picker.Item label={"4 Months (Security 70%)"} value={`4`} key={4} />
                        <Picker.Item label={"5 Months (Security 60%)"} value={`5`} key={5} />
                        <Picker.Item label={"6 Months (Security 50%)"} value={`6`} key={6} />
                        <Picker.Item label={"7 Months (Security 50%)"} value={`7`} key={7} />
                        <Picker.Item label={"8 Months (Security 50%)"} value={`8`} key={8} />
                        <Picker.Item label={"9 Months (Security 50%)"} value={`9`} key={9} />
                        <Picker.Item label={"10 Months (Security 50%)"} value={`10`} key={10} />
                        <Picker.Item label={"11 Months (Security 50%)"} value={`11`} key={11} />
                    </Picker>
                </View>

                <View style={styles.separator} />
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontWeight: '500', color: '#fff' }}>Select Meals</Text>
                </View>
                {
                    Meals.map((meal) => (
                        <View
                            key={meal.id}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 10,
                            }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => handleCheckboxToggle(meal)}
                                    style={[
                                        styles.checkbox,
                                        selectedMeals.includes(meal.id) && styles.checkboxSelected
                                    ]}
                                >
                                    {selectedMeals.includes(meal.id) && (
                                        <Text style={styles.checkmark}>✔</Text>
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.itemLabel}>{meal.name}</Text>
                            </View>
                            <Text style={styles.itemValue}>₹<PriceOnly data={meal.cost_pm} /></Text>
                        </View>
                    ))
                }

                {/*  */}
                <View style={styles.separator} />

                {/*  */}
                <View style={styles.itemContainer}>
                    <Text style={styles.itemLabel}>Rent Charges:</Text>
                    <Text style={styles.itemValue}>₹<PriceOnly data={data.room.occupancy_cost} /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemLabel}>Security Amount:</Text>
                    <Text style={styles.itemValue}>₹<PriceOnly data={securityCost} /></Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemLabel}>Discount:</Text>
                    <Text style={styles.itemValue}>- ₹<PriceOnly data={discount} /></Text>
                </View>

                {
                    TokenMoneyandSameRoom ? (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemLabel}>Token Money:</Text>
                            <Text style={styles.itemValue}>- ₹<PriceOnly data={tokenAmount} /></Text>
                        </View>
                    ) : (
                        <>
                        </>
                    )
                }

                <View style={styles.separator} />
                <View style={styles.itemContainer}>
                    <Text style={styles.totalLabel}>Total Payable:</Text>
                    <Text style={styles.totalValue}>₹{<PriceOnly data={payableamount} />}</Text>
                </View>

                {/* Custom Terms and Conditions Checkbox */}
                <View style={styles.termsContainer}>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                    >
                        <Icon
                            name={isTermsAccepted ? 'checkbox-outline' : 'square-outline'}
                            size={24}
                            color={isTermsAccepted ? '#71b100' : '#ccc'}
                        />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.termsText}>I accept the</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('AgreemantScreen') }}
                        >
                            <Text style={[styles.termsText, { color: '#fff', fontWeight: 800 }]}> Paying Guest Agreement</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {
                    TokenMoneyandSameRoom ? (
                        <>

                        </>
                    ) : (
                        <>
                            <View style={styles.separator} />
                            <View style={{ marginBottom: 15 }}>
                                <Text style={{ fontWeight: '500', color: '#fff' }}>Pay Token Amount To Reserve Bed</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={styles.payableAmount2}>TOKEN AMOUNT: ₹5,000</Text>
                                <TouchableOpacity
                                    style={[styles.button2]}
                                    onPress={() => { handleReserve(roomId) }}
                                >
                                    <Text style={styles.buttonText}>Reserve Now</Text>
                                </TouchableOpacity>
                            </View>

                        </>
                    )
                }



            </ScrollView >

            {/* Bottom Bar with Pay Now Button */}
            < View style={styles.bottomBar} >
                <Text style={styles.payableAmount}>Total Payable: ₹<PriceOnly data={payableamount} /></Text>
                <TouchableOpacity
                    style={[styles.button, !isTermsAccepted && styles.disabledButton]}
                    onPress={() => { handlePayment(roomId) }}
                    disabled={!isTermsAccepted}
                >
                    <Text style={styles.buttonText}>Pay Now</Text>
                </TouchableOpacity>
            </View >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
    },

    scrollContainer: {
        padding: 20,
        paddingBottom: 100, // Avoid overlap with the bottom bar
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemLabel: {
        fontSize: 16,
        color: '#e0e0e0', // Light text color
        fontWeight: 'bold'
    },
    itemBoldLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff', // White text color
    },
    itemValue: {
        fontSize: 16,
        color: '#e0e0e0', // Light text color
    },
    separator: {
        height: 1,
        backgroundColor: '#333', // Darker separator line
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff', // White text color
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff', // White text color
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
        color: '#e0e0e0', // Light text color
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
        backgroundColor: '#1f1f1f', // Darker bottom bar
        borderTopWidth: 1,
        borderTopColor: '#333', // Darker border color
    },
    payableAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e0e0e0', // Light text color
    },
    payableAmount2: {
        fontSize: 16,
        fontWeight: '500',
        color: '#e0e0e0', // Light text color
    },
    button: {
        backgroundColor: '#71b100', // Primary button color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    button2: {
        backgroundColor: '#71b100', // Alternate button color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#393939', // Disabled button in dark gray
    },
    buttonText: {
        color: '#ffffff', // White text for buttons
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectContainer: {
        marginVertical: 10,
        padding: 10,
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#1f1f1f', // Dark background for picker container
    },
    selectLabel: {
        fontSize: 16,
        color: '#e0e0e0', // Light text color
        marginBottom: 5,
    },
    picker: {
        height: 40,
        width: '100%',
        color: '#e0e0e0', // Light text color for picker
    },

    couponContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    couponInput: {
        flex: 1,
        height: 40,
        borderColor: '#444', // Darker input border color
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#1f1f1f', // Darker input background
        color: '#e0e0e0', // Light input text color
        marginRight: 5,
    },
    applyButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        marginLeft: 10,
    },
    applyButtonText: {
        color: '#ffffff', // White text for apply button
        fontWeight: 'bold',
    },

    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0', // Light checkbox border color
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: '#4caf50', // Green when selected
        borderColor: '#4caf50',
    },
    checkmark: {
        color: 'white',
        fontSize: 12,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00c853', // Bright green for totals
    },
});


export default PgRoomPaymentPage;
