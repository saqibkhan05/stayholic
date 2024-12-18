import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const ElectricityChargesCard = ({ edata }) => {
  const { id } = edata;
  console.log('Received id:', id);

  const [electricityData, setElectricityData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getElectricityData = async () => {
      try {
        const e_response = await axios.get(
          `https://stayholic.com/api/v1/customer/electricity_breakup/${id}`
        );
        const myData = e_response.data;
        setElectricityData(myData.break_up || []);
        setTotal(myData.total_cost || 0);
      } catch (error) {
        console.error('Error fetching electricity data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getElectricityData();
  }, [id]);

  return (
    <View style={styles.cardContainer}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <>
          <Text style={styles.label}>Total Electricity Charges:</Text>
          <Text style={styles.value}>₹ {total}</Text>
          <ScrollView contentContainerStyle={styles.listContainer}>
            {electricityData.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.text}>
                  <Text style={styles.label}>Reading:</Text> {item.starting_reading}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Occupancy:</Text> {item.occupancy}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.label}>Cost:</Text> ₹ {item.cost}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginTop: 16,
  },
  itemContainer: {
    backgroundColor: '#444',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 4,
  },
});

export default ElectricityChargesCard;
