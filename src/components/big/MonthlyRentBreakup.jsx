import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon2 from 'react-native-vector-icons/Ionicons';

const MonthlyRentBreakup = ({ data }) => {
    return (

        //         Electricity Charges
        // ⚡Room electricity: Included in rent! ✅ 
        // ❄ AC Usage: ₹12/unit. (Shared equally by all occupants)
        <View>
            <Text style={styles.title}>Electricity Charges</Text>

            <Text style={{ color: '#fff' }}>⚡Room electricity: Included in rent!</Text>
            <View style={styles.flex}>
                <Icon2 name="bulb-outline" size={40} color="#c7c5c5" />
                <View style={styles.bedText} >
                    <Text style={styles.descrip}>❄ AC Usage: ₹12/unit. (Shared equally by all occupants)</Text>
                    <View style={styles.justFlex}>
                        <Text style={styles.PriceTitle}>₹{data.room.e_unit_cost} / Unit</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default MonthlyRentBreakup

const styles = StyleSheet.create({
    flex: {
        marginLeft: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    justFlex: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
    PriceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5
    },
    bedText: {
        marginLeft: 20,
    },
    subheading: {
        fontWeight: 'bold',
        color: '#3D3B40',
        marginTop: 5
    },
    descrip: {
        fontSize: 14,
        marginTop: 5,
        maxWidth: '90%',
        color: '#fff'
    }


})