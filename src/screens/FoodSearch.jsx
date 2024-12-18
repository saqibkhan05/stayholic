import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import TopBar from '../components/big/TopBar'
import Icon from 'react-native-vector-icons/FontAwesome5';
import FoodItemList from '../components/big/FoodItemList';

const FoodSearch = () => {

    const [search, setSearch] = useState('')

    return (
        <View style={styles.container}>
            <TopBar />
            {/* search */}
            <View style={{ padding: 20 }}>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#bbb"  // Light gray for dark theme
                        value={search}
                        onChangeText={setSearch}  // Fixed onChangeText to update search state
                    />
                    {/* Filter Icon next to the TextInput */}
                    <TouchableOpacity
                        style={styles.filterButton2}
                        onPress={() => { /* Implement search functionality */ }}
                    >
                        <Icon name="search" size={18} color="#fff" style={styles.searchIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/*  */}
            <View style={{ marginHorizontal: 10 }}>
                <FoodItemList />
            </View>
        </View>
    )
}

export default FoodSearch

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background for dark mode
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#444', // Darker border for dark theme
        borderRadius: 0,
        padding: 0,
        width: '100%',
        backgroundColor: '#1F1F1F', // Slightly lighter dark background for the search bar
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
        color: '#fff', // White text color for input field
        fontSize: 16,
        paddingLeft: 15,
    },
});
