import { Alert, RefreshControl, ScrollView, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import LoginFirstScreen from '../LoginFirstScreen';
import DocumentUploader from './DocumentUploader';

const KycScreen = () => {

    const [isLogin, setIsLogin] = useState(false);
    const [documents, setDocuments] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getdata = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {
                token, token
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (response.data) {
                setIsLogin(true)
            }
        }
        else {
            Alert.alert('Error', 'You Have to login First');
        }
    }

    const refreshDataHandel = async () => {
        setRefreshing(true);
        await getdata();
        setRefreshing(false);
    }

    useEffect(() => {
        getdata();
    }, []);

    useEffect(() => {
        const getkycdata = async () => {
            const token = await AsyncStorage.getItem('token');
            const kyc_response = await axios.post('https://stayholic.com/api/v1/kyc', {
                token, token
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            console.log(kyc_response.data);
            setDocuments(kyc_response.data);
        }
        getkycdata();
    }, [isLogin]);

    // loading screen
    if (!isLogin) {
        return <LoginFirstScreen />;
    }

    // Main Screen
    return (
        <>
            <ScrollView
                style={styles.container}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshDataHandel} />}
            >
                <DocumentUploader documents={documents} />
            </ScrollView>
        </>
    );
}

export default KycScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        padding: 16,
    },
    documentContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#444", // Darker border color
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#1e1e1e', // Dark background for document container
    },
    documentName: {
        fontSize: 16,
        color: '#fff', // White text for document name
        flex: 2,
    },
    status: {
        fontSize: 14,
        color: '#bbb', // Lighter gray text for status
        flex: 1,
        textAlign: "center",
    },
    selectButton: {
        backgroundColor: "#333", // Dark button background
        padding: 8,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: "#007bff", // Blue submit button
        padding: 8,
        borderRadius: 5,
        opacity: 0.9,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',  // White heading color
        marginBottom: 20,
        textAlign: 'center',
    },
});
