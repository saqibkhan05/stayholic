import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PGRoomCarosel from '../components/small/PGRoomCarosel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Price from '../components/small/Price';
import Amenity from '../components/big/Amenity';
import PriceOnly from '../components/small/PriceOnly';

const { width } = Dimensions.get('window');

const HotelRoomViewScreen = ({ route }) => {
    const { roomId } = route.params;

    const navigation = useNavigation();
    const [hotelRoom, setHotelRoom] = useState(null); // Ensure a safe default state
    const [loading, setLoading] = useState(true)

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get(`https://stayholic.com/api/v1/h_room/${roomId}`);
            setHotelRoom(response.data.HotelRoom);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching room details:', error);
        }
    };

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading room details...</Text>
            </View>
        );
    }

    return (
        <>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>
                    {/* Carousel Slider */}
                    <View style={styles.carouselContainer}>
                        <PGRoomCarosel data={hotelRoom.images || []} />
                    </View>

                    <View style={styles.textContainer}>
                        {/* Room Name */}
                        <Text style={styles.roomName}>{hotelRoom.room_name}</Text>
                        <Text style={{ color: '#fff' }}>{hotelRoom.catogory}</Text>

                        {/* Amenities Section */}
                        <View style={styles.separator}></View>
                        <View style={styles.section}>
                            <Text style={styles.title}>Amenities</Text>
                            <Text style={styles.subtitle}>
                                Enjoy the Finest Facilities
                            </Text>
                            <View style={styles.amenitiesList}>
                                {hotelRoom.amenities?.length > 0 ? (
                                    hotelRoom.amenities.map((item) => (
                                        <Amenity amenity={item.name} key={item.id} />
                                    ))
                                ) : (
                                    <Text style={styles.noAmenitiesText}>
                                        No amenities available for this room.
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar with Pricing and Booking Button */}
            <View style={styles.bottomBar}>
                {/* Room Price */}
                <Text style={styles.priceText}>
                    ₹ <PriceOnly data={hotelRoom.cost} /> / Night
                </Text>

                {/* Book Now Button */}
                <TouchableOpacity
                    style={[styles.button, !hotelRoom.status && styles.buttonDisabled]}
                    onPress={() => navigation.navigate('HotelBookingScreen', { roomId })}
                    disabled={!hotelRoom.status}
                >
                    <Text style={styles.buttonText}>
                        {hotelRoom.status ? 'Book Now' : 'Sold'}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default HotelRoomViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    scrollView: {
        backgroundColor: '#121212',
    },
    textContainer: {
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    carouselContainer: {
        marginBottom: 10,
    },
    separator: {
        height: 1,
        backgroundColor: '#353535',
        marginVertical: 10,
    },
    roomName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        // textAlign: 'center',
        marginBottom: 10,
    },
    section: {
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#fff',
        marginBottom: 10,
    },
    amenitiesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noAmenitiesText: {
        color: '#aaa',
        fontSize: 14,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: width,
        position: 'absolute',
        bottom: 0,
    },
    priceText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#71b100',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#7a7a7a',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
    },
});
