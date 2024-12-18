import { TouchableOpacity, Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Carousel from 'react-native-reanimated-carousel';


const PGRoomCarosel = ({ data }) => {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.carouselItem} >
                {/* <Text>{item.file_path}</Text> */}
                <Image source={{ uri: item.file_path }} style={styles.image} />
            </View>
        )
    }
    return (
        <Carousel
            width={width}
            height={300}
            data={data}
            loop={true}  // Enable looping
            autoPlay={true}  // Enable auto-play
            autoPlayInterval={3000}  // Interval between slides in milliseconds
            renderItem={renderItem}
        />
    )
}
export default PGRoomCarosel

const styles = StyleSheet.create({
    carouselItem: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 300,
        resizeMode: 'cover',
    },
})