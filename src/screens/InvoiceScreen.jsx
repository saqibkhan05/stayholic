import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Linking } from 'react-native';

const InvoiceScreen = ({ route }) => {

  // get Param data
  const { transaction, transaction_from } = route.params;

  const dateTimeString = transaction.created_at;

  // Convert to a JavaScript Date object
  const dateObject = new Date(dateTimeString);

  // Extract the date in 'YYYY-MM-DD' format
  const formattedDate = dateObject.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',  // 'long' for full month name
    day: 'numeric'
  });


  // Demo invoice data for one item
  const [invoice, setInvoice] = useState({
    invoiceNumber: transaction.description,
    date: formattedDate,
    item: {
      name: transaction.description,
      price: transaction.amount,
    },
    total: transaction.amount,
  });

  const getTransactionData = () => {

  }

  const [transactionId, settransactionId] = useState();

  useEffect(() => {
    settransactionId(transaction.id)
  }, [transaction])

  const handleDownload = async () => {
    const downloadUrl = `https://stayholic.com/api/v1/invoice/${transactionId}`;  // Your download link

    // Open the URL in the browser
    try {
      await Linking.openURL(downloadUrl);
    } catch (error) {
      Alert.alert('Error', 'Failed to open the link.');
      console.error('Error opening the link:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Logo and Company Name */}
      <View style={styles.header}>
        <Image source={require('../assets/logo.jpg')} style={styles.logo} />
        <Text style={styles.companyName}>StayHolic</Text>
      </View>

      {/* Invoice Details */}
      <View style={styles.invoiceDetails}>
        <Text style={styles.invoiceTitle}>Invoice #{invoice.invoiceNumber}</Text>
        <Text style={styles.date}>Date: {invoice.date}</Text>
      </View>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Item Section */}
      <View style={styles.itemSection}>
        <Text style={styles.itemName}>{invoice.item.name}</Text>
        <View style={styles.itemRow}>
          <Text style={styles.itemPrice}>₹{invoice.item.price}</Text>
        </View>
        <Text style={styles.total}>Total: ₹{invoice.total}</Text>
      </View>

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadButtonText}>Download Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100, // Adjusted size
    height: 100, // Adjusted size
    marginRight: 10,
  },
  companyName: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  invoiceDetails: {
    marginBottom: 20,
  },
  invoiceTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#aaa',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#444', // Dark color for separator
    marginVertical: 20,
  },
  itemSection: {
    marginBottom: 20,
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  itemPrice: {
    fontSize: 16,
    color: '#fff',
  },
  total: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InvoiceScreen;
