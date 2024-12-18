import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import LoadingScreen from './LoadingScreen';
import axios from 'axios';

const MealViewScreen = ({ navigation, route }) => {
    const { mealId } = route.params;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch Data on Component Mount
    useEffect(() => {
        const fetchPropertyDetail = async () => {
            try {
                const response = await axios.get(`https://stayholic.com/api/v1/meal/${mealId}`);
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching locations:', error);
                setLoading(false);
            }
        };
        fetchPropertyDetail();
    }, [mealId]);

    const [paymentMethod, setPaymentMethod] = useState('monthly'); // default payment method

    const handleOrderNow = () => {
        navigation.navigate('MealOrderScreen', { paymentMethod, mealId });
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <View style={styles.container}>
            {/* Image at the top */}
            <Image source={{ uri: data.images[0].file_path }} style={styles.image} />
            <ScrollView contentContainerStyle={styles.content}>
                {/* Name and Price */}
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.price}>Monthly: ₹{data.cost_pm}</Text>
                <Text style={styles.price}>Daily: ₹{data.cost_pd}</Text>

                {/* Items Included in the Meal */}
                <View style={styles.itemsSection}>
                    <Text style={styles.itemsTitle}>Menu</Text>
                    {data.foods?.map((item) => (
                        <View key={item.id} style={styles.itemBox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: item.images[0].file_path }}
                                    style={{ width: 50, height: 50, borderRadius: 50 }}
                                />
                                <View>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemName2}>{item.day}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Payment Methods */}
                <View style={styles.paymentSection}>
                    <Text style={styles.paymentTitle}>Choose As you Preferred</Text>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'monthly' && styles.selected]}
                        onPress={() => setPaymentMethod('monthly')}
                    >
                        <Text style={styles.paymentText}>Monthly</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'daily' && styles.selected]}
                        onPress={() => setPaymentMethod('daily')}
                    >
                        <Text style={styles.paymentText}>Daily</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Bottom section for Order Now */}
            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.orderButton} onPress={handleOrderNow}>
                    <Text style={styles.orderButtonText}>Order Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MealViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    price: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 20,
    },
    itemsSection: {
        marginTop: 30,
    },
    itemsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
    },
    itemBox: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    itemName2: {
        fontSize: 14,
        fontWeight: '300',
        color: '#ccc',
        marginLeft: 10,
    },
    paymentSection: {
        marginTop: 30,
    },
    paymentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#fff',
    },
    paymentOption: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        marginBottom: 10,
    },
    selected: {
        backgroundColor: '#444',
        borderColor: '#007bff',
        borderWidth: 2,
    },
    paymentText: {
        fontSize: 16,
        color: '#fff',
    },
    bottomSection: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#333',
        alignItems: 'center',
    },
    orderButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
