import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Linking } from 'react-native';

const ApplyLeavingNotice = () => {
  // State for the form inputs
  const [bankingName, setBankingName] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [reasonMove, setReasonMove] = useState('');

  const [customerData, setCustomerData] = useState({});
  const [Kycverified, setKycverified] = useState(false);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      const response = await axios.post('https://stayholic.com/api/v1/customer/me', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const customer_data = response.data;
      setCustomerData(customer_data);
      setKycverified(customer_data.kyc_verified);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Form submission handler
  const handleSubmit = async () => {
    console.log('handleSubmit');

    if (!bankingName || !bankName || !accountNumber || !ifscCode || !reasonMove) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const response = await axios.post('https://stayholic.com/api/v1/notice_create', {
      customer_id: customerData.id,
      customer_name: customerData.name,
      bank_name: bankingName,
      bank_branch: bankName,
      bank_account_no: accountNumber,
      bank_ifsc: ifscCode,
      reason: reasonMove,
    });

    if (response.data.status) {
      console.log('notice submit');

      const downloadUrl = `https://stayholic.com/api/v1/downloadNotice/${customerData.id}`;  // Your download link

      // Open the URL in the browser
      try {
        await Linking.openURL(downloadUrl);
      } catch (error) {
        Alert.alert('Error', 'Failed to open the link.');
        console.error('Error opening the link:', error);
      }
    }

    // Process the form (e.g., send to server or save)
    console.log('Form Submitted', { bankingName, bankName, accountNumber, ifscCode, reasonMove });
    Alert.alert('Success', 'Your notice has been submitted!');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Apply Leaving Notice</Text>

        {/* Banking Details Group */}
        <Text style={styles.sectionTitle}>Banking Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Banking Name"
          placeholderTextColor="#888"
          value={bankingName}
          onChangeText={setBankingName}
        />
        <TextInput
          style={styles.input}
          placeholder="Name of Bank (Branch)"
          placeholderTextColor="#888"
          value={bankName}
          onChangeText={setBankName}
        />
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          placeholderTextColor="#888"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="IFSC Code"
          placeholderTextColor="#888"
          value={ifscCode}
          onChangeText={setIfscCode}
        />

        {/* Space between sections */}
        <View style={styles.space} />

        {/* Reason for Move Group */}
        <Text style={styles.sectionTitle}>Reason for Move</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Reason for move"
          placeholderTextColor="#888"
          value={reasonMove}
          onChangeText={setReasonMove}
          multiline
          numberOfLines={4}
        />

        {/* Conditional rendering based on Kycverified */}
        {Kycverified ? (
          // If KYC is verified, show the download button
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Apply Leaving Notice</Text>
          </TouchableOpacity>
        ) : (
          // If KYC is not verified, show the disabled button and message
          <>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#BDBDBD' }]} disabled>
              <Text style={styles.buttonText}>Apply Leaving Notice</Text>
            </TouchableOpacity>
            <Text style={styles.kycMessage}>Please complete your KYC</Text>
          </>
        )}

      </ScrollView>
    </View>
  );
};

export default ApplyLeavingNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
    padding: 20,
  },
  scrollView: {
    paddingBottom: 30, // Space at the bottom of scroll view
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#3D3B40',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#fff', // White text color
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#6200ee', // Button color
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  space: {
    height: 20, // Adds space between the sections
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }, 
  kycMessage: {
    marginTop: 20,
    color: '#FF5722',
    fontSize: 16,
  },
});
