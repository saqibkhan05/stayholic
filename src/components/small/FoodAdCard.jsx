import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any icon set you prefer

const { width } = Dimensions.get('window'); // Get device width

const FoodAdCard = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => { navigation.navigate('FoodScreen') }}
            >
                <ImageBackground
                    source={require('../../assets/food.jpg')} // Replace with your background image URL
                    style={styles.backgroundImage}
                    imageStyle={{ borderRadius: 10 }} // Rounding background image corners
                >
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.3)']} // Dark gradient overlay with transparency
                        style={styles.gradientOverlay}
                    >
                        <View style={styles.iconContainer}>
                            <Icon name="restaurant-menu" size={40} color="#fff" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}>Order Your Favorite Food</Text>
                            <Text style={styles.subText}>Get the best deals on food services</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

export default FoodAdCard

const styles = StyleSheet.create({
    cardContainer: {
        width: width * 0.92, // 90% of screen width
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
    },
    backgroundImage: {
        width: '100%',
        height: 120, // Adjust height as needed
        justifyContent: 'center',
    },
    gradientOverlay: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    iconContainer: {
        flex: 0.2, // Left side icon
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 0.8, // Right side text
        justifyContent: 'center',
    },
    titleText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
    },
});