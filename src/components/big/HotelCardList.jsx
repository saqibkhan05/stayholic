import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const HotelCardList = ({ location }) => {
    const navigation = useNavigation();
    const [hotelList, setHotelList] = useState([]);

    const searchHotel = async () => {
        try {
            const response = await axios.post('https://stayholic.com/api/v1/search_hotels', {
                location: location,
            });
            console.log();

            setHotelList(response.data.hotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    useEffect(() => {
        searchHotel();
    }, [location]);

    const renderHotel = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('HotelViewScreen', { hotelId: item.id })}
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
                <Text style={styles.hotelName}>{item.name}</Text>
                <Text style={styles.hotelLocation}>{item.location}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {hotelList.length > 0 ? (
                <FlatList
                    data={hotelList}
                    renderItem={renderHotel}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <Text style={styles.noDataText}>No hotels found in this location.</Text>
            )}
        </View>
    );
};

export default HotelCardList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 16,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    listContainer: {
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row', // Arrange items horizontally
        backgroundColor: '#1e1e1e', // Dark background for the card
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
        flex: 1, // Take up 1/3rd of the width
        marginRight: 10,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 2, // Take up 2/3rd of the width
    },
    hotelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff', // Light text
        marginBottom: 4,
    },
    hotelAddress: {
        fontSize: 14,
        color: '#cccccc', // Slightly dimmed text for address
        marginBottom: 4,
    },
    hotelLocation: {
        fontSize: 14,
        color: '#fff', // Further dimmed text for location
    },
});
