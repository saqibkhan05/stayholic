import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Switch,
    Button,
    Platform,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // For date input (iOS/Android)
import Icon from 'react-native-vector-icons/Ionicons'; // For icons
import LinearGradient from 'react-native-linear-gradient'; // For gradient button
import HotelCardList from '../components/big/HotelCardList';

const HotelScreen = ({ navigation }) => {

    const [location, setLocation] = useState('');



    const handleSearch = () => {

    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={styles.title}>Find Your Day Stay</Text>

                    {/* Location Input */}
                    <Text style={styles.label}>Location</Text>
                    <View style={styles.inputSection}>
                        <Icon name="location-outline" size={20} color="#ddd" />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Location"
                            value={location}
                            onChangeText={setLocation}
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* Search Button */}
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <LinearGradient
                            colors={['#3D3B40', '#1B1A1F']}
                            style={styles.gradient}
                        >
                            <Text style={styles.searchButtonText}>Search Hotels</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <HotelCardList location={location} />





                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default HotelScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',  // Dark background for the entire container
        padding: 10,
    },
    greetingText: {
        fontSize: 18,
        color: '#bbb',  // Light gray text for greeting
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',  // White title for contrast
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ddd',  // Light gray text for labels
        marginVertical: 8,
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',  // Darker background for input sections
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,  // Slightly stronger shadow for dark mode
        shadowRadius: 6,
        elevation: 3,
    },
    input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
        color: '#fff',  // Light text inside input fields
    },
    dateInput: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#333',  // Dark background for date input
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 15,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#fff',  // White text for date input
    },
    switchSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 15,
    },
    searchButton: {
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    searchButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',  // White text for button
    },
});
