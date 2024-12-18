import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Price = ({ data }) => {

    // Format the number with commas and two decimal places
    const amount = data; // Amount without decimal places
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,  // Ensures 0 decimal places
        maximumFractionDigits: 0    // Limits to 0 decimal places
    }).format(amount);


    return (
        <>
            <Text style={styles.priceText}>₹ {formattedAmount} / month</Text>
        </>
    )
}

export default Price

const styles = StyleSheet.create({
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
})