import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icon library
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const PgCard = ({ data }) => {

    // ------------------------------------------- occupancy
    let occupancy = '-';
    if (data.occupancy == '1') {
        occupancy = 'Private Room'
    }
    if (data.occupancy == '2') {
        occupancy = 'Twin Bed Room'
    }
    if (data.occupancy == '3') {
        occupancy = 'Tripple Bed Room'
    }
    // ------------------------------------------- occupancy end


    // ------------------------------------------- occupancy
    let catogory = '-';
    if (data.catogory == 'Premium') {
        catogory = 'Deluxe'
    }
    if (data.catogory == 'Deluxe') {
        catogory = 'Executive'
    }
    if (data.catogory == 'Luxury') {
        catogory = 'Super Deluxe'
    }
    // ------------------------------------------- occupancy end

    const navigation = useNavigation();

    const handleHotelPress = (roomId) => {
        navigation.navigate('RoomViewScreen', { roomId });
    };

    // Format the amount with commas and 0 decimal places
    const formattedAmount = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(data.occupancy_cost);

    // Capitalize the first letter of room type
    const capitalizedCurrencyString = data.pg.type.charAt(0).toUpperCase() + data.pg.type.slice(1);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleHotelPress(data.id)}>
            <View style={styles.card}>
                {/* Hotel Image with Overlay */}
                <View>
                    <Image source={{ uri: data.images[0].file_path }} style={styles.image} />
                    <View style={styles.overlay}>
                        <Text style={styles.pgName}>{data.pg.name}</Text>
                    </View>
                </View>

                {/* Details Section */}
                <View style={styles.details}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={styles.infoRow}>
                            <Icon name="location-outline" size={14} color="#fff" />
                            <Text style={styles.locationText}>{data.pg.location}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon name="home-outline" size={14} color="#fff" />
                            <Text style={styles.tag}>{capitalizedCurrencyString} PG</Text>
                        </View>
                    </View>




                    <View style={styles.infoRow}>
                        <Icon name="home-outline" size={14} color="#fff" />
                        <Text style={styles.locationText}>Room No. {data.room_name}</Text>
                    </View>

                    {/* Room Type */}
                    <View style={styles.infoRow}>
                        <Icon name="bed-outline" size={14} color="#fff" />
                        <Text style={styles.tag}>{catogory} room {data.roomtype}</Text>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {/* Occupancy */}
                        <View style={styles.infoRow}>
                            <Icon name="people-outline" size={14} color="#fff" />
                            <Text style={styles.occupancy}>: {occupancy} </Text>
                        </View>

                        <View style={styles.infoRow}>
                            <Icon name="cash-outline" size={14} color="#fff" />
                            <Text style={styles.rent}>₹ {formattedAmount}/-</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default PgCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#1e1e1e',
        borderRadius: 8,
        marginVertical: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        width: screenWidth * 0.9,
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    pgName: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
        fontWeight: '500'
    },
    details: {
        padding: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#fff',
        marginLeft: 6,
        fontWeight: '500'
    },
    tag: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff', // Light green to add contrast
        marginLeft: 6,
    },
    occupancy: {
        fontSize: 14,
        color: '#fff', // Lighter gray for readability
    },
    rent: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ddd', // Lighter gray for readability
        marginLeft: 6,
    },
});
