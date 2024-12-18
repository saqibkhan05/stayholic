import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!name || !email || !phone || !password) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Error", "Please enter a valid email.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('https://stayholic.com/api/v1/customer/create', {
                name,
                email,
                phone,
                password,
            });

            if (response.data?.id) {
                await AsyncStorage.setItem('customer_id', JSON.stringify(response.data.id));
                navigation.navigate('OtpScreen');
            } else {
                Alert.alert("Sign Up Failed", "Unable to retrieve customer ID.");
            }
        } catch (error) {
            if (error.response) {
                Alert.alert("Error", `User Already Exist: ${error.response.data.message}`);
            } else if (error.request) {
                Alert.alert("Error", "No response from server. Please try again.");
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.background}>
                <View style={styles.container}>
                    {/* Logo at the top */}
                    <Image
                        source={require('../../assets/logo.jpg')}
                        style={styles.logo}
                    />

                    {/* Name Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#fff"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/* Phone Number Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        placeholderTextColor="#fff"
                        keyboardType="phone-pad"
                        value={phone}
                        onChangeText={setPhone}
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />

                    {/* Loading Spinner or Button */}
                    {loading ? (
                        <ActivityIndicator size="large" color="#38787a" />
                    ) : (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <LinearGradient
                                colors={['#5a5a5a', '#1c1c1c']} // Dark gradient colors
                                style={styles.gradient}
                            >
                                <Text style={styles.buttonText}>SignUp</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    )}

                    {/* SignIn Text */}
                    <View style={styles.signinContainer}>
                        <Text style={styles.signInPrompt}>If you have an account, do </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={styles.signinText}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    background: {
        flexGrow: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 40,
        borderRadius: 100,
    },
    input: {
        width: '90%',
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#333',
        color: '#fff',
        fontSize: 16,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    signinContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signInPrompt: {
        color: '#ccc',
    },
    signinText: {
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        marginTop: 10,
        width: '80%',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
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
