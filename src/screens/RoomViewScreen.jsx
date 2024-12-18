import { TouchableOpacity, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import LoadingScreen from './LoadingScreen';
import PGRoomCarosel from '../components/small/PGRoomCarosel';
import Amenity from '../components/big/Amenity';
import RoomType from '../components/big/RoomType';
import MonthlyRentBreakup from '../components/big/MonthlyRentBreakup';
import PgRoomAddress from '../components/big/PgRoomAddress';
import Price_w from '../components/small/Price_w';
import PgViewTopBar from '../components/big/PgViewTopBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const RoomViewScreen = ({ navigation, route }) => {
    const { roomId } = route.params;
    const [data, setData] = useState({});
    const [beds, setBeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bedAvailable, setBedAvailable] = useState(false);

    const user = useSelector((state) => state.user.user)
    const isLogin = useSelector((state) => state.user.isLogin)


    // Function to check if any bed is available
    const areBedsAvailable = (beds) => {
        // Check if beds is a valid array and contains items
        if (!Array.isArray(beds) || beds.length === 0) {
            return false;
        }
        // Return true if any bed has status 0 (available)
        return beds.some(bed => bed.reserved === 0);
    };

    useEffect(() => {
        const fetchPropertyDetail = async () => {
            try {
                const response = await axios.get(`https://stayholic.com/api/v1/room/${roomId}`);
                setData(response.data);
                setBeds(response.data.room.beds || []);  // Ensure beds is an array, even if empty
                setLoading(false);
            } catch (error) {
                console.error('Error fetching room details:', error);
                setLoading(false);
            }
        };
        fetchPropertyDetail();
    }, [roomId]);

    useEffect(() => {
        // Update bed availability whenever `beds` changes
        setBedAvailable(areBedsAvailable(beds));
    }, [beds]);

    const bookNowHandle = (roomId) => {
        navigation.navigate('PgRoomPaymentPage', { roomId });
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>

                    {/* Carousel Slider */}
                    <View style={styles.carouselContainer}>
                        <PGRoomCarosel data={data.room.images} />
                    </View>

                    <View style={styles.textContainer}>

                        <PgViewTopBar data={data} />
                        <View style={styles.separator}></View>
                        <RoomType data={data} />
                        <View style={styles.separator}></View>
                        <MonthlyRentBreakup data={data} />
                        <View style={styles.separator}></View>
                        <PgRoomAddress data={data} />

                        {/* Amenities Section */}
                        <View style={styles.separator}></View>
                        <View style={styles.section2}>
                            <Text style={styles.title}>Amenities</Text>
                            <Text style={{ marginBottom: 10, color: '#fff' }}>Enjoy the Finest Facilities</Text>
                            <View style={styles.AmenitiesList}>
                                {data.room.amenities.map((item) => (
                                    <Amenity amenity={item.name} key={item.id} />
                                ))}
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView>

            {/* Bottom Bar with pricing and booking button */}
            <View style={styles.bottomBar}>
                {/* Pricing */}


                {/* Conditional message or Book Now Button */}
                {user.status ? (
                    <Text style={{ color: '#fff', fontSize: 14 }}>
                        One room per guest; can't book multiple.
                    </Text>
                ) : (
                    <>
                        <Text style={{ color: '#fff' }}>
                            <Price_w data={data.room.occupancy_cost} />
                        </Text>
                        
                        <TouchableOpacity
                            style={[styles.button, !bedAvailable && styles.buttonDisabled]}
                            onPress={() => bookNowHandle(data.room.id)}
                            disabled={!bedAvailable}  // Disable button if no beds are available
                        >
                            <Text style={styles.buttonText}>
                                {bedAvailable ? 'Book Now' : 'Sold Out'}
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </>
    )
}

export default RoomViewScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    textContainer: {
        paddingTop: 5,
        paddingHorizontal: 20,
        paddingBottom: 100,
        // paddingVertical: 10
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#353535',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: width,
        position: 'absolute',
        bottom: 0,
    },
    button: {
        backgroundColor: '#71b100',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: '#7a7a7a', // Gray out button when disabled
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 0,
    },
    AmenitiesList: {
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    section2: {
        marginVertical: 20,
    },
    separator: {
        height: 1,
        backgroundColor: '#353535',
        marginVertical: 10,
    },
});
