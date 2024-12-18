import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const FoodCard = ({ imageUrl, name, price, tags, id }) => {
    console.log(id);

    const [isFavorite, setIsFavorite] = useState(false); // State to manage favorite status
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const navigation = useNavigation();
    // FoodItemViewScreen

    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => { navigation.navigate('FoodItemViewScreen', { id }) }}
        >
            {/* Food Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.foodImage} />

                {/* Heart Icon */}
                <TouchableOpacity style={styles.heartIcon} onPress={toggleFavorite}>
                    <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'red' : '#ccc'} />
                </TouchableOpacity>
            </View>

            <View style={{ paddingHorizontal: 15, paddingVertical: 8 }}>
                {/* Food Name */}
                <Text style={styles.foodName}>{name}</Text>

                {/* Price */}
                <Text style={styles.foodPrice}>₹{price}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default FoodCard;

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#1E1E1E', // Dark background color for card
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        margin: 4,
    },
    imageContainer: {
        position: 'relative',
    },
    foodImage: {
        width: '100%',
        height: 100,
        borderRadius: 10,
        marginBottom: 0,
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'transparent',
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff', // White color for text in dark mode
        marginBottom: 0,
    },
    foodPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745', // Green for price
        marginBottom: 0,
    }
});
