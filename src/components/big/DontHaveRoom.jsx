import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';

const DontHaveRoom = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>No Bookings Yet</Text>
            <Text style={styles.subtitle}>
                You don’t currently have any active bookings. Ready to explore new stays?
                Start your next Stay with us!
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('PgSearchScreen')}
            >
                <Text style={styles.buttonText}>Explore Rooms</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DontHaveRoom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#E0E0E0',
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
    },
    subtitle: {
        color: '#B0B0B0',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#71b100',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
