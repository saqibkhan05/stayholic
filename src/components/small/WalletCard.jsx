import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PriceOnly from './PriceOnly';

const WalletCard = ({ title, amount }) => {
    return (
        <View style={styles.walletCard}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardAmount}>₹<PriceOnly data={amount} /></Text>
        </View>
    );
};

export default WalletCard;

const styles = StyleSheet.create({
    walletCard: {
        flex: 1,
        backgroundColor: '#2c2c2c',  // Dark background for card
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,  // Slightly stronger shadow for dark theme
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 14,
        color: '#fff',  // Light text color for title
        marginBottom: 10,
    },
    cardAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',  // Light color for amount
    },
});
