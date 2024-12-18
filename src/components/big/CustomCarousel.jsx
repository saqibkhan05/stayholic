import { StyleSheet, View, Dimensions, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel'; // Import Carousel
import axios from 'axios';

const { width } = Dimensions.get('window');

const CustomCarousel = () => {

    const [imageData, setImageData] = useState([]); // State for the current active slide

    const fetchData = async () => {
        try {
            const response = await axios.get('https://stayholic.com/api/v1/home_banner');
            setImageData(response.data);
        } catch (error) {
            console.error('Error fetching Wi-Fi data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <View style={styles.carouselContainer}>
            {/* Carousel */}
            <View style={styles.carouselContainer}>
                <Carousel
                    loop
                    width={width}
                    height={200}
                    autoPlay={true}
                    data={imageData}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View style={styles.carouselItem}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.carouselImage}
                                resizeMode="cover"
                            />
                            {/* <Text style={styles.carouselText} >{item.title}</Text> */}
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default CustomCarousel;

const styles = StyleSheet.create({
    carouselContainer: {
        marginTop: 10,
        position: 'relative',
    },
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        height: 200,
        borderRadius: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
    },
    carouselText: {
        position: 'absolute',
        color: '#fff', // White text color
        fontSize: 20,  // Font size 30
        left: 20,      // Position text at the left
        textAlign: 'left', // Align text to the left
        justifyContent: 'center',
        top: '40%',    // Vertically center text
        fontWeight: 'bold',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: add a slight background for better visibility
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,

    },
    inactiveDot: {
        backgroundColor: '#ccc',
    },
});
