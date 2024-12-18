import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Optional for adding gradient
import axios from 'axios';

const ForgotPassWord = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [customer, setCustomer] = useState({});

    const handleLogin = async () => {
        try {
            console.log('Email:', username);

            // Make the API call
            const response = await axios.post('https://stayholic.com/api/v1/customer/forgotpassword', {
                email: username,
            });
            setCustomer(response.data.customer)

            // Handle response
            if (response.data.status) {
                navigation.navigate('ForgotPasswordOtpScreen', {
                    email: username, // Sending the email as data
                    customer: response.data.customer.id
                });
            } else {
                console.log('Error in response:', response.data.message || 'Unknown error');
                alert(response.data.message || 'Failed to process request.');
            }
        } catch (error) {
            // Handle network errors or unexpected issues
            if (error.response) {
                console.error('Error Response:', error.response.data);
                alert(error.response.data.message || 'Something went wrong. Please try again.');
            } else if (error.request) {
                console.error('No Response:', error.request);
                alert('No response from the server. Please check your network connection.');
            } else {
                console.error('Error Message:', error.message);
                alert('An unexpected error occurred. Please try again later.');
            }
        }
    };


    return (
        <View style={styles.background}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    {/* Logo */}
                    <Image
                        source={require('../../assets/logo.jpg')}
                        style={styles.logo}
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#fff"
                    />

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#5a5a5a', '#1c1c1c']} // Dark gradient colors
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>
                                Reset Password
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* SignUp Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.textLight}>Enter your email to reset your password!</Text>
                    </View>

                    {/* Home Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.textLight}>Go back to </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={styles.signupText}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

export default ForgotPassWord

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        width: '100%',
        height: '100%',
    },
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 130,
        height: 130,
        marginBottom: 40,
        borderRadius: 100,
    },
    input: {
        width: '90%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#333', // Dark input background
        color: '#fff', // White text
        fontSize: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    textLight: {
        color: '#ddd',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        marginTop: 20,
        width: '80%',
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
