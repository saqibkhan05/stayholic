import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import FoodCard from '../small/FoodCard';
import axios from 'axios';

const FoodItemList = () => {

    const [foodItems, setFoodItems] = useState([]);

    const callApi = async () => {
        const response = await axios.get('https://stayholic.com/api/v1/Allfoods');
        console.log(response.data);
        setFoodItems(response.data)
    }

    useEffect(() => {
        callApi()
    }, [])

    return (
        <>
            {/* Horizontal ScrollView for Food Cards */}
            <ScrollView style={styles.scrollViewContainer}>
                <View style={styles.rowContainer}>
                    {foodItems.map((item, index) => (
                        <View key={item.id} style={styles.cardWrapper}>
                            <FoodCard
                                imageUrl={item.images[0].file_path}
                                name={item.name}
                                price={item.cost}
                                tags={item.tags}
                                id={item.id}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView >
        </>
    )
}

export default FoodItemList

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: '#121212', // Dark background color for the scroll view
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    cardWrapper: {
        width: '48%', // Ensures two cards fit in one row with some margin
        marginBottom: 15,
        backgroundColor: '#1E1E1E', // Dark card background
        borderRadius: 8, // Rounded corners
        shadowColor: '#000', // Shadow for iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6, // For better card elevation on dark mode
        elevation: 5, // For Android shadow
    },
});
