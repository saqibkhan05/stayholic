import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const WifiComponent = () => {
    const [wifiData, setWifiData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Wi-Fi data from the API
    const fetchWifiData = async () => {
        try {
            const response = await axios.get('https://stayholic.com/api/v1/wifi');
            setWifiData(response.data);
        } catch (error) {
            console.error('Error fetching Wi-Fi data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWifiData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#BBBBBB" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Available Wi-Fi Networks</Text>
            {wifiData.map((item) => (
                <View key={item.id} style={styles.wifiCard}>
                    <View>
                        <Text style={styles.wifiName}>{item.name}</Text>
                        <Text style={styles.wifiDetails}>Username: {item.username}</Text>
                        <Text style={styles.wifiDetails}>Password: {item.password}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default WifiComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark mode background
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E0E0E0',
        marginBottom: 16,
        textAlign: 'center',
    },
    wifiCard: {
        backgroundColor: '#333',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    wifiName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E0E0',
    },
    wifiDetails: {
        fontSize: 14,
        color: '#BBBBBB',
        marginTop: 4,
    },
});
