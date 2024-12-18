import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const RefrelCard = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.centerContainer}>
            <TouchableOpacity
                style={styles.cardContainer}
                onPress={() => navigation.navigate('RefrelCodeScreen')}
            >
                <LinearGradient
                    colors={['#333333', '#444444']} // Darker gradient colors
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientBackground}
                >
                    {/* Icon on the Left */}
                    <View style={styles.iconWrapper}>
                        <Icon name="card-giftcard" size={35} color="#fff" />
                    </View>

                    {/* Text on the Right */}
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}>Refer & Earn</Text>
                        <Text style={styles.subText}>Unlock Credits For Every Successful Referral</Text>
                    </View>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    centerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cardContainer: {
        width: width * 0.92, // 92% of screen width
        borderRadius: 10,
        marginVertical: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    gradientBackground: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    iconWrapper: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: 10,
        borderRadius: 50,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    titleText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subText: {
        color: '#ccc',
        fontSize: 14,
        marginTop: 3,
    },
});

export default RefrelCard;
