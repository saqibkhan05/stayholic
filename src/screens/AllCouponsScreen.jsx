import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Clipboard, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const coupons = [
    { id: '1', name: 'STAY250', amountOff: '250 ' },
    { id: '2', name: 'STAY300', amountOff: '300 ' },
    { id: '3', name: 'STAY350', amountOff: '350 ' },
    // Add more coupons as needed
];

const AllCouponsScreen = () => {
    const copyToClipboard = (code) => {
        Clipboard.setString(code);
        if (Platform.OS === 'android') {
            ToastAndroid.show('Coupon copied to clipboard!', ToastAndroid.SHORT);
        } else {
            Alert.alert('Copied!', 'Coupon code has been copied to clipboard.');
        }
    };

    const renderCoupon = ({ item }) => (
        <View style={styles.couponCard}>
            <View style={styles.couponInfo}>
                <Text style={styles.couponName}>{item.name}</Text>
                <Text style={styles.amountOff}>₹{item.amountOff} OFF</Text>
            </View>
            <TouchableOpacity onPress={() => copyToClipboard(item.name)} style={styles.copyButton}>
                <Icon name="content-copy" size={20} color="#000" />
                <Text style={styles.copyText}>Copy</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={coupons}
                keyExtractor={(item) => item.id}
                renderItem={renderCoupon}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background
    },
    listContent: {
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    couponCard: {
        backgroundColor: '#1E1E1E', // Dark card background
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 3,
    },
    couponInfo: {
        flex: 1,
    },
    couponName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for readability
    },
    amountOff: {
        fontSize: 16,
        color: '#81C784', // Light green for discounts
        marginTop: 4,
    },
    copyButton: {
        backgroundColor: '#81C784', // Light green button for better visibility
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    copyText: {
        color: '#000', // Black text for contrast on the light green button
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 4,
    },
});

export default AllCouponsScreen;
