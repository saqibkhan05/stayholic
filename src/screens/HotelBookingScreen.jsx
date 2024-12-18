import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const HotelBookingScreen = ({ route }) => {
    const { roomId } = route.params;

    const [hotelRoom, setHotelRoom] = useState({});
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [showCheckInPicker, setShowCheckInPicker] = useState(false);
    const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
    const [numberOfPersons, setNumberOfPersons] = useState(1);
    const [basePrice, setBasePrice] = useState(0);
    const [mealPlan, setMealPlan] = useState('AP'); // Default selection: AP

    const fetchRoomDetails = async () => {
        try {
            const response = await axios.get(`https://stayholic.com/api/v1/h_room/${roomId}`);
            const roomDetails = response.data.HotelRoom;
            setHotelRoom(roomDetails);
            setBasePrice(roomDetails.cost); // Safely set base price
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch room details.');
        }
    };

    const calculateNumberOfDays = () => {
        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
        const diffDays = Math.round(
            (checkOutDate.getTime() - checkInDate.getTime()) / oneDay
        );
        return diffDays > 0 ? diffDays : 0; // Ensure non-negative days
    };

    const numberOfDays = calculateNumberOfDays();

    const calculateTotalAmount = () => {
        const personMultiplier = numberOfPersons === 3 ? 1.3 : 1; // 30% increase for 3 persons
        return numberOfDays * basePrice * personMultiplier;
    };

    const totalAmount = calculateTotalAmount();

    const handleDateChange = (event, selectedDate, isCheckIn = true) => {
        if (isCheckIn) {
            setShowCheckInPicker(false);
            if (selectedDate) setCheckInDate(selectedDate);
        } else {
            setShowCheckOutPicker(false);
            if (selectedDate) setCheckOutDate(selectedDate);
        }
    };

    const validateDates = () => {
        if (!checkInDate || !checkOutDate) {
            Alert.alert('Error', 'Please select both check-in and check-out dates.');
            return false;
        }
        if (checkOutDate <= checkInDate) {
            Alert.alert('Error', 'Check-out date must be after the check-in date.');
            return false;
        }
        return true;
    };

    const handleBooking = () => {
        if (!validateDates()) return;
        Alert.alert('Success', 'Booking successful!');
        // Additional booking logic here
    };

    useEffect(() => {
        fetchRoomDetails();
    }, [roomId]);

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.label}>{hotelRoom.room_name}</Text>

            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCheckInPicker(true)}
            >
                <Text style={styles.inputText}>
                    {checkInDate.toDateString()}
                </Text>
            </TouchableOpacity>
            {showCheckInPicker && (
                <DateTimePicker
                    value={checkInDate}
                    mode="date"
                    minimumDate={new Date()}
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={(event, date) => handleDateChange(event, date, true)}
                />
            )}

            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCheckOutPicker(true)}
            >
                <Text style={styles.inputText}>
                    {checkOutDate.toDateString()}
                </Text>
            </TouchableOpacity>
            {showCheckOutPicker && (
                <DateTimePicker
                    value={checkOutDate}
                    mode="date"
                    minimumDate={checkInDate}
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={(event, date) => handleDateChange(event, date, false)}
                />
            )}

            <Text style={styles.label}>Occupancy</Text>
            <View style={styles.personSelector}>
                {[1, 2, 3].map((num) => (
                    <TouchableOpacity
                        key={num}
                        style={[
                            styles.personOption,
                            numberOfPersons === num && styles.selectedPerson,
                        ]}
                        onPress={() => setNumberOfPersons(num)}
                    >
                        <Text
                            style={[
                                styles.personText,
                                numberOfPersons === num && styles.selectedText,
                            ]}
                        >
                            {num}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.price}>Total Amount: ₹{totalAmount.toFixed(2)}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={handleBooking}
                activeOpacity={0.8}
            >
                <LinearGradient
                    colors={['#5a5a5a', '#1c1c1c']}
                    style={styles.gradient}
                >
                    <Text style={styles.buttonText}>Book Now</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default HotelBookingScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#121212',
    },
    input: {
        width: '90%',
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#333',
        borderRadius: 8,
        alignItems: 'center',
    },
    inputText: {
        color: '#fff',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
        marginBottom: 10,
    },
    personSelector: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    personOption: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#333',
    },
    selectedPerson: {
        backgroundColor: '#555',
    },
    personText: {
        color: '#fff',
        fontSize: 16,
    },
    selectedText: {
        fontWeight: 'bold',
    },
    price: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    button: {
        marginTop: 20,
        width: '80%',
    },
    gradient: {
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
