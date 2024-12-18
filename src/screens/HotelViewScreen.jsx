import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PGRoomCarosel from '../components/small/PGRoomCarosel';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const HotelViewScreen = ({ route }) => {
    const { hotelId } = route.params;

    const navigation = useNavigation();
    const [hotel, setHotel] = useState({});
    const [hotelRooms, setHotelRooms] = useState([]);

    const searchHotel = async () => {
        try {
            const response = await axios.get(`https://stayholic.com/api/v1/hotel/${hotelId}`);
            setHotel(response.data.hotel);
            setHotelRooms(response.data.rooms);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    useEffect(() => {
        searchHotel();
    }, [hotelId]);

    const renderHotel = ({ item }) => (
        <TouchableOpacity style={styles.card}
            onPress={() => { navigation.navigate('HotelRoomViewScreen', { roomId: item.id }) }}
        >
            {/* Hotel Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: item.images?.[0]?.file_path || 'https://via.placeholder.com/150' }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            {/* Hotel Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.hotelName}>{item.room_name}</Text>
                <Text style={styles.hotelAddress}>{item.catogory}</Text>
                <Text style={styles.hotelCost}>
                    ₹ {item.cost} / Night
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
                {/* Hotel Carousel */}
                <PGRoomCarosel data={hotel.images} />

                {/* Hotel Overview */}
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>{hotel.name}</Text>
                    <Text style={styles.subheading}>{hotel.address}</Text>
                </View>

                {/* Room List */}
                <View style={styles.section2}>
                    {hotelRooms.length > 0 ? (
                        <FlatList
                            data={hotelRooms}
                            renderItem={renderHotel}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContainer}
                        />
                    ) : (
                        <Text style={styles.noDataText}>No rooms available for this hotel.</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default HotelViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#121212', // Dark theme background
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#121212', // Dark theme background
    },
    scrollContent: {
        paddingBottom: 100,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff', // Light text
        marginBottom: 4,
    },
    subheading: {
        fontSize: 14,
        color: '#fff', // Slightly dimmed subheading text
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        color: '#fff', // Descriptive text
        marginBottom: 10,
    },
    section2: {
        padding: 10
    },
    noDataText: {
        fontSize: 16,
        color: '#aaaaaa',
        textAlign: 'center',
        marginTop: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#1e1e1e', // Card background for dark theme
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    imageContainer: {
        flex: 1,
        marginRight: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 2,
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff', // Light text
        marginBottom: 4,
    },
    hotelAddress: {
        fontSize: 14,
        color: '#fff', // Slightly dimmed text for address
        marginBottom: 4,
    },
    hotelCost: {
        fontSize: 14,
        color: '#fff', // Highlight for cost (green)
    },
});
