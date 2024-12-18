import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginFirstScreen = () => {
    const navigation = useNavigation();

    const handleLoginPress = () => {
        navigation.navigate('SignInScreen'); // Replace with your actual login screen name
    };

    return (
        <View style={styles.container}>
            <Text style={styles.message}>You need to log in first to access this feature.</Text>
            <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    message: {
        fontSize: 18,
        color: '#FFFFFF', // White text color for dark mode
        textAlign: 'center',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#719330', // Purple accent color for dark mode
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    loginText: {
        color: '#FFFFFF', // White text color on the button
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginFirstScreen;
