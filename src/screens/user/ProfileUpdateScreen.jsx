import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const ProfileUpdateScreen = () => {
    const [c_id, setC_id] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    const [login, setLogin] = useState(false);
    const [customerData, setCustomerData] = useState({});

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const customer_data = response.data;
            setCustomerData(customer_data);

            setName(customer_data.name);
            setEmail(customer_data.email);
            setPhone(customer_data.phone);
            setC_id(customer_data.id)

            setLogin(true);
        } else {
            console.log('No login');
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const pickImage = () => {
        ImagePicker.launchImageLibrary(
            { mediaType: 'photo' },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorMessage) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else {
                    const source = { uri: response.assets[0].uri };
                    setProfileImage(source);
                }
            }
        );
    };

    const handleUpdateDetails = async () => {

        try {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me_update', {
                c_id: c_id,
                name: name,
                email: email,
                phone: phone,
            });

        } catch (error) {
            console.error('Error fetching locations:', error);
        }

        alert('Details Updated!');
    };

    const handleUpdatePassword = async () => {
        if (!password.trim()) {
            alert('Password cannot be blank!');
            return;
        }

        if (password.trim().length < 5) {
            alert('Password must be at least 5 characters long!');
            return;
        }

        try {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me_password', {
                c_id: c_id,
                password: password,
            });

        } catch (error) {
            console.error('Error fetching locations:', error);
        }

        alert('Password Updated!');
    };


    return (
        <View style={styles.container}>
            <ScrollView>




                {/* General Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Personal Details</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Name"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail} // Keep this if the value may change programmatically
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={false} // Makes the field read-only
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Phone Number"
                        placeholderTextColor="#aaa"
                        value={phone}
                        onChangeText={setPhone} // Keep this if the value may change programmatically
                        keyboardType="phone-pad"
                        editable={false} // Makes the field read-only
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdateDetails}>
                        <Text style={styles.buttonText}>Update Details</Text>
                    </TouchableOpacity>
                </View>

                {/* Password Update Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Update Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter New Password"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
                        <Text style={styles.buttonText}>Update Password</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

export default ProfileUpdateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#121212',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    section: {
        marginBottom: 30,
        padding: 15,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        marginTop: 20,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderColor: '#333',
        paddingBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#3D3B40',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        color: '#fff',
        backgroundColor: '#333',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#3D3B40',
        borderRadius: 100,
        width: 120,
        height: 120,
        justifyContent: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 100,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        color: '#bbb',
    },
});
