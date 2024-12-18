import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StaticSection = () => {
    const navigation = useNavigation();

    return (
        <>
            <View style={{ marginLeft: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.mainTitle}>Not just</Text>
                    <Text style={styles.mainTitle2}> Four walls and a roof</Text>
                </View>
                <Text style={styles.subtitle}>Discover A Stay That's More Then Just A place To Be</Text>
            </View>
            <View style={styles.card}>
                {/* Card Heading */}
                <Text style={styles.title}>Experiance the Art of Luxury Living</Text>

                {/* Card Image */}
                <Image source={require('../../assets/1.png')} style={styles.image} />

                {/* Card Description */}
                <Text style={styles.description}>Stay for All: Co-living, Girls-Only, Boys-Only</Text>

                {/* Button to Find PG */}
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('PgSearchScreen') }}>
                    <Ionicons name="search-outline" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.buttonText}>Let’s Find Your PG</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default StaticSection;

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E0E0E0', // Light gray for better contrast
        marginBottom: 10,
        marginTop: 20,
    },
    mainTitle2: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#B3B3B3', // Slightly darker gray
        marginBottom: 10,
        marginTop: 20,
    },
    subtitle: {
        color: '#fff', // Soft gray for secondary text
    },
    card: {
        width: '94%',
        backgroundColor: '#333333', // Dark background for card
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        padding: 15,
        marginVertical: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E0E0', // Light gray for title text
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#fff', // Softer gray for description
        marginBottom: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2A2A2A', // Darker button background
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    icon: {
        marginRight: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff', // Green for button text
        fontWeight: 'bold',
    },
});
