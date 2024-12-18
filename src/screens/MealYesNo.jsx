import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Screen } from 'react-native-screens';


const MealYesNo = () => {

    const navigation = useNavigation();

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

    useEffect(() => {
        checkLoginStatus();
    }, [])


    const handleYes = async () => {

        const response = await axios.post('https://stayholic.com/api/v1/meal_update', {
            c_id: customerData.id,
            user_want_meal: true
        });

        navigation.navigate('BottomNavigation', { screen: 'ProFileNavigation' })

    };

    const handleNo = async () => {

        const response = await axios.post('https://stayholic.com/api/v1/meal_update', {
            c_id: customerData.id,
            user_want_meal: false
        });


        navigation.navigate('BottomNavigation', { screen: 'ProFileNavigation' })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Would you like to have a meal?</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleYes}>
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNo}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
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
    title: {
        color: '#ffffff', // Light text
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#1f1f1f', // Darker button background
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderColor: '#bb86fc', // Purple border for styling
        borderWidth: 1,
        alignItems: 'center',
    },
    buttonText: {
        color: '#bb86fc', // Accent color for text
        fontSize: 18,
        fontWeight: '600',
    },
});

export default MealYesNo;
