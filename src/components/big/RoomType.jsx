import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon2 from 'react-native-vector-icons/Ionicons';

const RoomType = ({ data }) => {

    let occupancy = '-'

    if (data.room.occupancy == '1') {
        occupancy = 'Private Room'
    }
    if (data.room.occupancy == '2') {
        occupancy = 'Twin Bed Room'
    }
    if (data.room.occupancy == '3') {
        occupancy = 'Tripple Bed Room'
    }

    // ------------------------------------------- occupancy
    let catogory = '-';
    if (data.room.catogory == 'Premium') {
        catogory = 'Deluxe'
    }
    if (data.room.catogory == 'Deluxe') {
        catogory = 'Executive'
    }
    if (data.room.catogory == 'Luxury') {
        catogory = 'Super Deluxe'
    }
    // ------------------------------------------- occupancy end

    // Format the number with commas and two decimal places
    const amount = data.room.occupancy_cost; // Amount without decimal places
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,  // Ensures 0 decimal places
        maximumFractionDigits: 0    // Limits to 0 decimal places
    }).format(amount);

    return (
        <View>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Room No. {data.room.room_name}</Text>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>{catogory} Room</Text>
            <Text style={{ color: '#fff' }}>{occupancy} {data.room.roomtype}</Text>
            <View style={styles.flex}>
                <Icon2 name="bed-outline" size={40} color="#c7c5c5" />
                <View style={styles.bedText}>
                    <Text style={{ color: '#fff' }}>Starts from</Text>
                    <View style={styles.justFlex}>
                        <Text style={styles.PriceTitle}>₹{formattedAmount} / month</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default RoomType

const styles = StyleSheet.create({
    flex: {
        marginLeft: 20,
        marginTop: 5,
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
    },
    bedText: {
        marginLeft: 20,
    }

})