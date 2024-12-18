import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OtpScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);

    // Handle text change and move focus to the next box
    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        if (text && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = async () => {
        const otpCode = otp.join('');
        console.log('OTP entered:', otpCode);

        const customer_id = await AsyncStorage.getItem('customer_id');
        const response = await axios.post('https://stayholic.com/api/v1/customer/verify_otp', {
            customer_id: customer_id,
            otp: otpCode,
        });

        if (response.data.status) {
            await AsyncStorage.removeItem('customer_id');
            navigation.navigate('SignInScreen');
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                {/* Logo at the top */}
                <Image
                    source={require('../../assets/logo.jpg')}
                    style={styles.logo}
                />

                {/* OTP input fields */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each TextInput
                            style={styles.otpInput}
                            maxLength={1}
                            keyboardType="numeric"
                            value={digit}
                            onChangeText={(text) => handleOtpChange(text, index)}
                        />
                    ))}
                </View>

                {/* Resend OTP text */}
                <TouchableOpacity onPress={() => { /* Logic to resend OTP */ }}>
                    <Text style={styles.resendText}>Didn’t receive your OTP? Resend it.</Text>
                </TouchableOpacity>

                {/* Verify Button */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleOtpSubmit}
                >
                    <LinearGradient
                        colors={['#3D3B40', '#3D3B40']}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Verify</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#121212',  // Dark background
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        // paddingHorizontal: 20,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
        borderRadius: 60,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderColor: '#888',
        borderWidth: 1,
        textAlign: 'center',
        color: '#fff',  // Text color for dark mode
        fontSize: 20,
        borderRadius: 8,
        marginHorizontal: 5,
        backgroundColor: '#1f1f1f',  // Input background color
        elevation: 3,  // Android shadow
        shadowColor: '#000',  // iOS shadow
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    resendText: {
        color: '#4bc2c8', // Accent color for dark mode
        marginTop: 20,
        fontSize: 16,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    button: {
        marginTop: 30,
        width: '80%',
        elevation: 5, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    gradient: {
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OtpScreen;
