import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TransactionBank = ({ transaction }) => {

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
        minimumFractionDigits: 0,  // Ensures 0 decimal places
        maximumFractionDigits: 0    // Limits to 0 decimal places
    }).format(amount / 100);


    return (
        <View style={styles.transactionCard}>
            <View>
                <Text style={styles.transactionText}>{transaction.status ? 'Success' : 'Failed'}</Text>
                <Text style={[styles.transactionDate]}>{transaction.note}</Text>
                <Text style={styles.transactionDate}>{formattedDate}</Text>
            </View>
            <Text style={[styles.transactionAmount, transaction.status ? styles.credit : styles.debit]}>
                ₹{formattedAmount}
            </Text>
        </View>
    )
}

export default TransactionBank

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