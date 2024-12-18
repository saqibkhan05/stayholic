import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Linking,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useSelector } from 'react-redux';
import axios from 'axios';

const HelpAndSupportScreen = () => {
    const [supportData, setSupportData] = useState([]);
    const user = useSelector((state) => state.user.user);

    // Fetch Support Data
    useEffect(() => {
        const fetchSupportData = async () => {
            try {
                const response = await axios.get('https://stayholic.com/api/v1/support');
                setSupportData(response.data);
            } catch (error) {
                Alert.alert('Error', 'Failed to fetch support details. Please try again later.');
                console.error(error);
            }
        };

        if (user.status) {
            fetchSupportData();
        }
    }, [user.status]);

    // Function to handle copying a phone number
    const handleCopyToDialer = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Heading */}
            <Text style={styles.heading}>Contact Us</Text>
            <Text style={styles.subHeading}>
                If you have any query, feel free to contact us
            </Text>

            {/* First Row */}
            <View style={styles.row}>
                {/* Live Chat */}
                <TouchableOpacity style={styles.box}>
                    <Icon name="chatbubble-ellipses-outline" size={24} color="#fff" />
                    <Text style={styles.boxText}>Live Chat</Text>
                    <Text style={styles.statusText}>Coming Soon</Text>
                </TouchableOpacity>

                {/* WhatsApp Chat */}
                <TouchableOpacity
                    style={styles.box}
                    onPress={() => Linking.openURL('https://wa.me/9266967979')}>
                    <Icon name="logo-whatsapp" size={24} color="#fff" />
                    <Text style={styles.boxText}>Chat on WhatsApp</Text>
                </TouchableOpacity>
            </View>

            {/* Email */}
            <View style={styles.row}>
                <TouchableOpacity
                    style={styles.box}
                    onPress={() => Linking.openURL('mailto:support@stayholic.com')}>
                    <Icon name="mail-outline" size={24} color="#fff" />
                    <Text style={styles.boxText}>Email</Text>
                </TouchableOpacity>
            </View>

            {/* Support Section */}
            {user.status && (
                <>
                    <Text style={styles.supportHeading}></Text>
                    {supportData.map((supportItem) => (
                        <View key={supportItem.id} style={styles.supportRow}>
                            <Text style={styles.supportName}>{supportItem.name}</Text>
                            {supportItem.numbers.map((num) => (
                                <TouchableOpacity
                                    key={num.id}
                                    style={styles.supportNumberContainer}
                                    onPress={() => handleCopyToDialer(num.number)}>
                                    <Icon name="call-outline" size={20} color="#fff" />
                                    <Text style={styles.supportNumber}>{num.number}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212', // Dark background
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeading: {
        fontSize: 16,
        color: '#bbb',
        textAlign: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    box: {
        flex: 1,
        backgroundColor: '#333', // Box background
        marginHorizontal: 8,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    boxText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 8,
    },
    statusText: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 4,
    },
    supportHeading: {
        fontSize: 18,
        color: '#fff',
        marginVertical: 15,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
        paddingBottom: 5,
    },
    supportRow: {
        marginBottom: 15,
    },
    supportName: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    supportNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#333',
        borderRadius: 8,
    },
    supportNumber: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 10,
    },
});

export default HelpAndSupportScreen;
