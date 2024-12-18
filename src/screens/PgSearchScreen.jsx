import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Button, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import TopBar from '../components/big/TopBar';
import PgCard from '../components/big/PgCard';
import PgRoomList from '../components/big/PgRoomList';
import CustomCarousel from '../components/big/CustomCarousel';
import AboutSection from '../components/big/AboutSection';

const PgSearchScreen = ({ navigation, route }) => {

    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    const [search, setSearch] = useState('')
    const [selectedOption1, setSelectedOption1] = useState(""); // State for first select field
    const [selectedOption2, setSelectedOption2] = useState(""); // State for second select field
    const [selectedOption3, setSelectedOption3] = useState(""); // State for third select field

    const { selectedOption1: passedOption1 } = route.params || {}; // Destructure passed parameter


    // Extract the passed parameter
    useEffect(() => {
        if (route.params?.selectedOption1) {
            setSelectedOption1(route.params.selectedOption1); // Update the state
        }
    }, [route.params?.selectedOption1]);

    // Trigger handleSearch after selectedOption1 is updated
    useEffect(() => {
        if (selectedOption1) {
            handelSearch();
        }
    }, [selectedOption1, selectedOption2, selectedOption3]);

    // Rest of your component code...

    // Function to clear all filters
    const clearFilters = () => {
        setSelectedOption1("");  // Reset to NAN for PG type
        setSelectedOption2("");  // Reset to NAN for Room type
        setSelectedOption3("");  // Reset to NAN for Occupancy
    };

    const [searchData, setSearchData] = useState({
        location: search,
        type: selectedOption1,
        catogory: selectedOption2,
        occupancy: selectedOption3,
    })


    const renderOption = ({ item }) => (
        <TouchableOpacity style={styles.option} onPress={() => handleOptionSelect(item)}>
            <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
    );

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setModalVisible(false); // Close modal after selecting an option
    };

    const handelSearch = () => {
        const xxx = {
            location: search,
            type: selectedOption1,
            catogory: selectedOption2,
            occupancy: selectedOption3,
        }
        setSearchData(xxx)
    }

    return (
        <>

            <View style={styles.container}>


                <View style={{ padding: 10 }}>
                    {/*  Input */}
                    <View style={styles.searchSection}>
                        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
                            <Icon name="filter" size={18} color="#fff" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor="gray"
                            value={search}
                            onChangeText={setSearch}
                        />
                        {/* Filter Icon next to the TextInput */}
                        <TouchableOpacity style={styles.filterButton2} onPress={handelSearch}>
                            <Icon name="search" size={18} color="#3D3B40" style={styles.searchIcon} />
                        </TouchableOpacity>
                    </View>

                    <PgRoomList data={searchData} />


                </View>

            </View>

            {/* Modal with select fields */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Apply Filters</Text>

                        {/* First Select Field */}
                        <Text style={styles.label}>PG type : </Text>
                        <Picker
                            selectedValue={selectedOption1}
                            onValueChange={(itemValue) => setSelectedOption1(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="NAN" value="" />
                            <Picker.Item label="Boys" value="boys" />
                            <Picker.Item label="Girls" value="girls" />
                        </Picker>

                        {/* Second Select Field */}
                        <Text style={styles.label}>Room Type :</Text>
                        <Picker
                            selectedValue={selectedOption2}
                            onValueChange={(itemValue) => setSelectedOption2(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="NAN" value="" />
                            <Picker.Item value="Deluxe" label="Executive" />
                            <Picker.Item value="Premium" label="Deluxe" />
                            <Picker.Item value="Luxury" label="Super Deluxe" />
                        </Picker>

                        {/* Third Select Field */}
                        <Text style={styles.label}>Occupancy :</Text>
                        <Picker
                            selectedValue={selectedOption3}
                            onValueChange={(itemValue) => setSelectedOption3(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="NAN" value="" />
                            <Picker.Item label="Single Bed" value="1" />
                            <Picker.Item label="Double Bed" value="2" />
                            <Picker.Item label="Triple Bed" value="3" />
                        </Picker>

                        {/* Clear Filters Button */}
                        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                            <Text style={styles.clearButtonText}>Clear All Filters</Text>
                        </TouchableOpacity>

                        {/* Close Modal Button */}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Done</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </>
    )
}

export default PgSearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
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
    input: {
        flex: 1,
        paddingLeft: 0,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 350,
        backgroundColor: '#2A2A2A', // Dark background color for modal
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E0E0E0', // Light color for modal title text
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 5,
        color: '#C0C0C0', // Gray color for labels
    },
    picker: {
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: '#3D3B40',
        backgroundColor: '#1F1F1F', // Dark background for picker
        color: '#E0E0E0', // Light color for picker text
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#719330',
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    clearButton: {
        marginTop: 20,
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    clearButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
