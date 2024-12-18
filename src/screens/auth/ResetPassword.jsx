import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ResetPasswordScreen = ({ navigation, route }) => {


    // Access the passed data
    const { customer } = route.params;

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            // 
            const response = await axios.post('https://stayholic.com/api/v1/customer/updatepassword', {
                customer_id: customer,
                newPassword: newPassword,
            });

            if (response.data.status) {
                navigation.navigate('SignInScreen');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to reset password. Please try again.');
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

                    {/* New Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholderTextColor="#fff"
                    />

                    {/* Confirm Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor="#fff"
                    />

                    {/* Reset Password Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleResetPassword}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={['#5a5a5a', '#1c1c1c']} // Dark gradient colors
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* Back to SignIn Link */}
                    <View style={styles.signupContainer}>
                        <Text style={styles.textLight}>Go back to </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
                            <Text style={styles.signupText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ResetPasswordScreen;

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
