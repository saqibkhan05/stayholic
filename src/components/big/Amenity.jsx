import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Amenity = ({ amenity }) => {
    return (
        <LinearGradient
            colors={['#333', '#111']} // Dark gradient from dark gray to near-black
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
        >
            <Text style={styles.text}>{amenity}</Text>
        </LinearGradient>
    );
};

export default Amenity;

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginTop: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3, // Adds a shadow on Android
    },
    text: {
        color: '#fff', // White text for better contrast
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
