import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Transaction = ({ transaction }) => {

    const navigation = useNavigation();

    const dateTimeString = transaction.created_at;

    // Convert to a JavaScript Date object
    const dateObject = new Date(dateTimeString);

    // Extract the date in 'YYYY-MM-DD' format
    const formattedDate = dateObject.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',  // 'long' for full month name
        day: 'numeric'
    });

    const amount = transaction.amount; // Amount without decimal places

    // Format the number with commas and two decimal places
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,  // Ensures 2 decimal places
        maximumFractionDigits: 2    // Limits to 2 decimal places
    }).format(amount);

    const handelnavigation = async (transaction) => {
        transaction_from = 'wallet'
        navigation.navigate('InvoiceScreen', { transaction, transaction_from })
    }

    return (
        <TouchableOpacity
            onPress={() => { handelnavigation(transaction) }}
        >
            <View style={styles.transactionCard}>
                <View>
                    <Text style={styles.transactionText}>{transaction.description}</Text>
                    <Text style={styles.transactionDate}>{formattedDate}</Text>
                </View>
                <Text style={[styles.transactionAmount, transaction.type == 'credit' ? styles.credit : styles.debit]}>
                    {transaction.type == 'credit' ? '+' : '-'} ₹{formattedAmount}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Transaction

const styles = StyleSheet.create({

    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
    },
    transactionText: {
        fontSize: 16,
        color: '#fff',
    },
    transactionDate: {
        fontSize: 12,
        color: '#999',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    credit: {
        color: '#fff',
    },
    debit: {
        color: '#999',
    }
})