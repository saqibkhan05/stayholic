import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'; // Optional for adding gradient
import axios from 'axios';
import messaging from '@react-native-firebase/messaging'
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/slices/userSlice';

const SignInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [fcmToken, setFcmToken] = useState('');

    // useEffect(() => {
    //     // Generate the FCM token when the component mounts
    //     const fetchFcmToken = async () => {
    //         try {
    //             const token = await messaging().getToken();
    //             console.log("FCM Token:", token);
    //             setFcmToken(token);
    //         } catch (error) {
    //             console.error("Failed to get FCM token:", error);
    //         }
    //     };

    //     fetchFcmToken();
    // }, []);

    const dispatch = useDispatch(); // Initialize Redux dispatch

    const handleLogin = async () => {
        try {
            console.log('inside try');
            const response = await axios.post('https://stayholic.com/api/v1/customer/login', {
                email: username,
                password: password
            });

            if (response.data.status) {

                const userData = response.data.user_data;
                const token = response.data.tokken;

                // Save user data and login status to AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(userData));
                await AsyncStorage.setItem('token', response.data.tokken);
                await AsyncStorage.setItem('isLogin', 'true');

                // Save user data to Redux
                dispatch(setUser(userData));
                dispatch(setToken(token))

                // Send FCM token to the backend
                if (fcmToken) {
                    await axios.post('https://stayholic.com/api/v1/customer/fcmtoken', {
                        id: userData.id,
                        fcm_token: fcmToken
                    });
                }

                // Navigate to the home screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'BottomNavigation' }],
                });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        } finally {
            setLoading(false);
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

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#fff"
                    />

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#5a5a5a', '#1c1c1c']} // Dark gradient colors
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* SignUp Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.textLight}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ForgotPassWord */}

                    <View style={styles.signupContainer}>
                        <Text style={styles.textLight}></Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassWord')}>
                            <Text style={styles.signupText}>Forgot Password ? </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Home Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.textLight}>Go back to </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('BottomNavigation', { screen: 'HomeScreen' })}>
                            <Text style={styles.signupText}>Home</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default SignInScreen;

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
