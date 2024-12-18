import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';  // You can use any icon set
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const NotificationsScreen = ({ navigation }) => {

    const [rentNotifications, setRentNotifications] = useState(false);
    const [electricityNotifications, setElectricityNotifications] = useState(false);
    const [mealNotifications, setMealNotifications] = useState(false);
    const [mealName, setMealName] = useState('');
    const [customerData, setCustomerData] = useState({});

    // Check if the user is logged in and get their data
    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const customer_data = response.data;
            setCustomerData(customer_data);
        }
    };

    const getRentData = async () => {

        // Replace with your API URL
        const response = await axios.post('https://stayholic.com/api/v1/rent_notication', {
            c_id: customerData.id
        });

        setRentNotifications(response.data.status)
    }

    const getElectricityData = async () => {

        // Replace with your API URL
        const response = await axios.post('https://stayholic.com/api/v1/electricity_notification', {
            c_id: customerData.id
        });

        setElectricityNotifications(response.data.status)
    }

    const getMealData = async () => {

        // Replace with your API URL
        const response = await axios.post('https://stayholic.com/api/v1/meal_notification', {
            c_id: customerData.id
        });

        setMealNotifications(response.data.status)
        setMealName(response.data.meal.name)
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);
    useEffect(() => {
        getRentData();
        getElectricityData();
        getMealData();
    }, [customerData]);


    return (
        <View style={styles.container}>
            {rentNotifications ? (
                <>
                    <TouchableOpacity
                        style={styles.notificationContainer}
                        onPress={() => { navigation.navigate('PayRenr') }}
                    >
                        <Icon name="notifications" size={30} color="#fff" style={styles.icon} />

                        <View style={styles.notificationTextContainer}>
                            <Text style={styles.notificationTitle}>Rent Is Due</Text>
                        </View>
                    </TouchableOpacity>
                </>
            ) : (
                <></>
            )}
            {electricityNotifications ? (
                <>
                    <TouchableOpacity
                        style={styles.notificationContainer}
                        onPress={() => { navigation.navigate('PayElectritybill') }}
                    >
                        <Icon name="notifications" size={30} color="#fff" style={styles.icon} />

                        <View style={styles.notificationTextContainer}>
                            <Text style={styles.notificationTitle}>Your electricity bill is due</Text>
                        </View>

                    </TouchableOpacity>
                </>
            ) : (
                <></>
            )}
            {mealNotifications ? (
                <>
                    <TouchableOpacity
                        style={styles.notificationContainer}
                        onPress={() => { navigation.navigate('MealYesNo') }}
                    >
                        <Icon name="notifications" size={30} color="#fff" style={styles.icon} />

                        <View style={styles.notificationTextContainer}>
                            <Text style={styles.notificationTitle}>Do you want {mealName}</Text>
                        </View>
                    </TouchableOpacity>
                </>
            ) : (
                <></>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',  // Dark background color
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',  // White text color for heading
        marginBottom: 20,
        textAlign: 'center',
    },
    notificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',  // Dark background for each notification
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#444',  // Slight border to distinguish notifications
    },
    icon: {
        marginRight: 15,
    },
    notificationTextContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        color: '#fff',  // White color for notification text
    },
});

export default NotificationsScreen;
