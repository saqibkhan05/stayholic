import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Button, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/big/TopBar';
import PgCard from '../components/big/PgCard';
import PgRoomList from '../components/big/PgRoomList';
import CustomCarousel from '../components/big/CustomCarousel';
import AboutSection from '../components/big/AboutSection';
import RefrelCard from '../components/small/RefrelCard';
import AboutSectionFood from '../components/big/AboutSectionFood';
import StaticSection from '../components/big/StaticSection';
import FoodAdCard from '../components/small/FoodAdCard';

const HomeScreen = ({ navigation }) => {



    return (
        <ScrollView style={styles.scrollContainer}>
            <View style={styles.container}>

                {/*  */}
                <TopBar />

                {/*  */}
                <CustomCarousel />

                <View style={{ padding: 10 }}>
                    {/* SEARCH BUTTON */}
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="gray"
                            onPress={() => { navigation.navigate('PgSearchScreen') }} // Corrected onPress
                        />
                        {/* Filter Icon next to the TextInput */}
                        <TouchableOpacity
                            style={styles.filterButton2}
                            onPress={() => { navigation.navigate('PgSearchScreen') }} // Corrected onPress
                        >
                            <Icon name="search" size={18} color="#3D3B40" style={styles.searchIcon} />
                        </TouchableOpacity>
                    </View>

                    {/*  */}
                    <AboutSection navigation={navigation} />

                    {/*  */}
                    <RefrelCard />

                    {/*  */}
                    <AboutSectionFood />

                    <FoodAdCard />

                    <StaticSection />



                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
    },
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 0,
        padding: 0,
        width: '100%',
        backgroundColor: '#fff',
        marginTop: 15,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    searchIcon: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        paddingLeft: 15,
        color: '#E0E0E0', // Light color for input text
        fontSize: 16,
        placeholderTextColor: '#9E9E9E', // Light gray for placeholder text
    },
    filterButton: {
        padding: 15,
        marginRight: 10,
        backgroundColor: '#3D3B40', // Dark background color for filter button
    },
    filterButton2: {
        marginRight: 5,
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#3D3B40', // Dark border color
        borderRadius: 0,
        padding: 0,
        width: '100%',
        backgroundColor: '#1F1F1F', // Dark background color for search section
        marginTop: 15,
        // Shadow (optional for slight contrast)
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    searchIcon: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#9E9E9E', // Gray color for icons
    },
    filterButton2: {
        marginRight: 5,
    },
});
