import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FoodItemList from '../components/big/FoodItemList';
import FoodItemHList from '../components/big/FoodItemHList';
import TopBar from '../components/big/TopBar';
import CustomCarousel from '../components/big/CustomCarousel';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FoodCarousel from '../components/big/FoodCarousel';
import RefrelCard from '../components/small/RefrelCard';

const FoodScreen = ({ navigation }) => {
    const [search, setSearch] = useState('')

    return (
        <ScrollView style={styles.screenContainer}>
            <View style={styles.container}>
                <TopBar />

                {/* search */}
                <View style={{ padding: 20 }}>
                    <View style={styles.searchSection}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="gray"
                            value={search}
                            onPress={() => { navigation.navigate('FoodSearch') }} // Corrected onPress
                        />
                        {/* Filter Icon next to the TextInput */}
                        <TouchableOpacity
                            style={styles.filterButton2}
                            onPress={() => { navigation.navigate('FoodSearch') }} // Corrected onPress
                        >
                            <Icon name="search" size={18} color="#fff" style={styles.searchIcon} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* scrosol */}
                <FoodCarousel />

                <View style={{ paddingHorizontal: 20 }}>
                    {/* Vertical Food List */}
                    <View style={styles.listContainer}>
                        <Text style={styles.subTitle}>All Meals</Text>
                        <Text style={styles.listDescription}>Delicious, Nutritious, and Balanced Meals</Text>
                        <FoodItemHList />
                    </View>
                    <RefrelCard />

                    {/* Vertical Food List */}
                    <View style={styles.listContainer}>
                        <Text style={styles.listDescription}>Delicious, Nutritious, and Balanced Meals</Text>
                    </View>
                    <FoodItemList />
                </View>
            </View>
        </ScrollView>
    );
};

export default FoodScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
    },
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color for container
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#444', // Dark border color
        borderRadius: 8,
        padding: 5,
        width: '100%',
        backgroundColor: '#333', // Dark background for search bar
        marginTop: 5,
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
        color: '#fff', // White text for dark mode
        fontSize: 16,
        paddingLeft: 15,
    },
    filterButton2: {
        marginRight: 5,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    screenTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff', // White title
    },
    iconRow: {
        flexDirection: 'row',
    },
    filterIcon: {
        marginLeft: 15,
    },
    listContainer: {
        marginBottom: 5,
    },
    subTitle: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: '600',
        color: '#fff', // White subtitle text
    },
    listDescription: {
        color: '#ccc', // Light gray for description text
        fontWeight: '900'
    },
});
