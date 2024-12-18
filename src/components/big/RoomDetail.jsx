import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Using Ionicons for outline icons
import Amenity from './Amenity';
import { useNavigation } from '@react-navigation/native';

const RoomDetail = ({ data }) => {

    const navigation = useNavigation();
    // Check if the required data fields are available
    if (!data || !data.room || !data.room.pg) {
        // Render a loading indicator until data is available
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#BBBBBB" />
            </View>
        );
    }

    // Determine occupancy type
    let occupancy = '-';
    if (data.room.occupancy === '1') {
        occupancy = 'Private Room';
    } else if (data.room.occupancy === '2') {
        occupancy = 'Double Sharing Room';
    } else if (data.room.occupancy === '3') {
        occupancy = 'Triple Sharing Room';
    }

    const handleLeaveRoom = () => {
        console.log("Leaving room...");
        navigation.navigate('LeavingRoomScreen')
        // Add functionality here for leaving the room
    };

    return (
        <View style={styles.cardContainer}>
            {/* Hotel Name */}
            <Text style={styles.hotelName}>{data.room.pg.name}</Text>

            <View style={{ marginBottom: 15 }}>
                {/* Room Info with Icons */}
                <View style={styles.infoRow}>
                    <View style={styles.iconTextRow}>
                        <Icon name="bed-outline" size={20} color="#BBBBBB" />
                        <Text style={styles.roomInfo}>Room: {data.room.room_name}</Text>
                    </View>
                </View>

                {/* Room Info with Icons */}
                <View style={styles.infoRow}>
                    <View style={styles.iconTextRow}>
                        <Icon name="bulb-outline" size={20} color="#BBBBBB" />
                        <Text style={styles.roomInfo}>Electricity Cost: {data.room.e_unit_cost}/unit</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <View style={styles.iconTextRow}>
                        <Icon name="pricetag-outline" size={20} color="#BBBBBB" />
                        <Text style={styles.category}>{data.room.catogory}</Text>
                    </View>
                </View>

                {/* Occupancy Info with Icon */}
                <View style={styles.iconTextRow}>
                    <Icon name="people-outline" size={20} color="#BBBBBB" />
                    <Text style={styles.occupancy}> {occupancy}</Text>
                </View>


            </View>

            {/* Leave Room Button */}
            <TouchableOpacity style={styles.leaveRoomButton} onPress={handleLeaveRoom}>
                <Text style={styles.leaveRoomText}>Notice</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RoomDetail;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#333', // Dark background color
        borderRadius: 12,
        padding: 16,
        margin: 10,
        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5,
    },
    hotelName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E0E0E0', // Light text color for dark mode
        marginBottom: 8,
    },
    infoRow: {
        marginBottom: 8,
    },
    iconTextRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    roomInfo: {
        fontSize: 16,
        color: '#BBBBBB',
        marginLeft: 8, // Space between icon and text
    },
    category: {
        fontSize: 16,
        color: '#BBBBBB',
        marginLeft: 8,
    },
    occupancy: {
        fontSize: 16,
        color: '#BBBBBB',
        marginLeft: 8,
    },
    leaveRoomButton: {
        backgroundColor: '#71b100', // Red button for a prominent "Leave Room" action
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    leaveRoomText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF', // White text for contrast
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
});
