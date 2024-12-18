import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AboutCard = ({ imageUrl, title, tagline, nav, navprop }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate(nav, { selectedOption1: navprop })} // Navigate to another screen
        >
            <ImageBackground
                source={{ uri: imageUrl }}
                style={styles.image}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.tagline}>{tagline}</Text>
                </View>
            </ImageBackground>
            
        </TouchableOpacity>
    );
};

export default AboutCard

const styles = StyleSheet.create({
    card: {
        height: 200, // Customize the card height as needed
        width: '45%', // Card width can be adjusted
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5, // Add shadow for Android
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5, // Add shadow for iOS
    },
    image: {
        flex: 1, // Make image fill the card
        justifyContent: 'flex-end', // Align text to the bottom
    },
    imageStyle: {
        borderRadius: 10, // Rounded corners
    },
    textContainer: {
        padding: 15,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark background for text
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    tagline: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
});