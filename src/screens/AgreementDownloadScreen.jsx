import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Screen } from 'react-native-screens';

const AgreementDownloadScreen = () => {
    const navigation = useNavigation();
    const [customerData, setCustomerData] = useState({});
    const [Kycverified, setKycverified] = useState(false);

    // Check if the user is logged in and get their data
    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const customer_data = response.data;
            setCustomerData(customer_data);
            setKycverified(customer_data.kyc_verified);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    // Function to handle file download
    const handleDownload = async () => {
        const downloadUrl = `https://stayholic.com/api/v1/agreemant/${customerData.id}`;  // Your download link

        // Open the URL in the browser
        try {
            await Linking.openURL(downloadUrl);
        } catch (error) {
            Alert.alert('Error', 'Failed to open the link.');
            console.error('Error opening the link:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Paying Guest Agreement</Text>

            {/* Conditional rendering based on Kycverified */}
            {Kycverified ? (
                // If KYC is verified, show the download button
                <TouchableOpacity style={styles.button} onPress={handleDownload}>
                    <Text style={styles.buttonText}>Download Agreement</Text>
                </TouchableOpacity>
            ) : (
                // If KYC is not verified, show the disabled button and message
                <>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#BDBDBD' }]} disabled>
                        <Text style={styles.buttonText}>Download Agreement</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('BottomNavigation', { screen: 'ProFileNavigation', params: { screen: 'KycScreen' } }) }}
                    >
                        <Text style={styles.kycMessage}>Please complete your KYC</Text>
                    </TouchableOpacity>
                </>
            )
            }
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    kycMessage: {
        marginTop: 20,
        color: '#FF5722',
        fontSize: 16,
    },
});

export default AgreementDownloadScreen;
