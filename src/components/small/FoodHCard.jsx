import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react'
const { width, height } = Dimensions.get('window')

const FoodHCard = ({ imageUrl, name, price, tags }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Food Image */}
            <Image source={{ uri: imageUrl }} style={styles.foodImage} />

            <View style={{ padding: 15 }}>
                {/* Food Name */}
                <Text style={styles.foodName}>{name}</Text>

                {/* Price */}
                <Text style={styles.foodPrice}>${price}</Text>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                    {tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{tag}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

export default FoodHCard
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scrollView: {
        paddingBottom: 10,
    },
    cardContainer: {
        width: width * 0.8,
        marginRight: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
        padding: 0,
    },
    foodImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    foodName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    foodPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: '#eee',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        fontSize: 12,
        color: '#333',
    },
});