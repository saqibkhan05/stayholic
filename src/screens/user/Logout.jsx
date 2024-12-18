import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/userSlice';

const Logout = ({ navigation }) => {

    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch();

    // Function to clear AsyncStorage data
    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            dispatch(logoutUser());
            navigation.goBack();
        } catch (error) {
            console.error('Error clearing AsyncStorage:', error);
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };



    return (
        <View style={styles.container}>
            <Text style={styles.message}>Hii {user.name}</Text>
            <Text style={styles.message2}>Are you nsure want to log out ?</Text>
            {/*  */}
            <TouchableOpacity onPress={handleLogout} style={styles.button}>
                <Text style={styles.buttonText}>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',  // Dark background
    },
    message: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
    },
    message2: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FF5733',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Logout;
