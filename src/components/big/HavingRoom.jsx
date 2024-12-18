import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ElectricityChargesCard from './ElectricityChargesCard';
import RoomDetail from './RoomDetail';
import LoadingScreen from '../../screens/LoadingScreen';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
import WifiComponent from './WifiComponent';


const HavingRoom = ({ data }) => {

  const navigation = useNavigation();
  const { id } = data;
  console.log(id);

  const [loading, setLoading] = useState(true);
  // 
  const [roomData, setRoomData] = useState();

  const getdata = async () => {
    const response = await axios.post('https://stayholic.com/api/v1/customer/myroom', {
      customer_id: id,
    });
    // Handle the response
    setRoomData(response.data)
    setLoading(false)
  }

  useEffect(() => {
    getdata();
  }, [id])

  // loading screen
  if (loading) {
    return <LoadingScreen />
  }
  // Main Screen

  return (
    <>
      {/*  */}
      <RoomDetail data={roomData} />

      {/*  */}
      <ElectricityChargesCard edata={{ id }} />

      <WifiComponent />

      <TouchableOpacity
        onPress={() => { navigation.navigate('AgreementDownloadScreen') }}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Download Rent Agreement</Text>
        </View>
      </TouchableOpacity>

    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  hotelName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoRow: {
    marginBottom: 8,
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomInfo: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8, // Space between icon and text
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  occupancy: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  leaveRoomButton: {
    backgroundColor: '#545454',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  leaveRoomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    margin: 10,
    backgroundColor: '#71b100', // Dark background for card
    borderRadius: 10,
    elevation: 5, // Adds shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 10, // Shadow blur radius for iOS
    justifyContent: 'center', // Centers the button vertically within the card
    alignItems: 'center', // Centers the button horizontally within the card
    padding: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff', // Light text for dark background
  },
  button: {
    backgroundColor: '#6200ea', // Purple button color for dark theme
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // White text for button
    fontSize: 16,
    textAlign: 'center',
  },
});


export default HavingRoom
