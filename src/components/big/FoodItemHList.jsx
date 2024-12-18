import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const FoodItemHList = () => {

    const navigation = useNavigation();

    const [foodItems, setFoodItems] = useState([]);

    const callApi = async () => {
        const response = await axios.post('https://stayholic.com/api/v1/allmeals');
        console.log(response.data);
        setFoodItems(response.data)
    }

    useEffect(() => {
        callApi()
    }, [])

    const handelClick = (mealId) => {
        navigation.navigate('MealViewScreen', { mealId })
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {foodItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.tag}
                        onPress={() => { handelClick(item.id) }}
                    >
                        <Image
                            source={{ uri: item.images[0].file_path }}
                            style={styles.tagImage}
                        />
                        <Text style={styles.tagText}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default FoodItemHList

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    tag: {
        backgroundColor: '#333', // Dark background for the tag
        borderRadius: 50,
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginHorizontal: 5,
        flexDirection: 'row', // Align text and image horizontally
        alignItems: 'center',
        // paddingVertical: 10, // Add some vertical padding
    },
    tagText: {
        fontSize: 14,
        color: '#fff', // White text color for dark mode
        marginRight: 30, // Add some space between the text and image
        marginLeft: 20,
    },
    tagImage: {
        width: 50,
        height: 50,
        borderRadius: 50, // Circular border radius
    },
});
