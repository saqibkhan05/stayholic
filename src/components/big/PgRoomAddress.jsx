import { StyleSheet, Text, View, TouchableOpacity, Alert, Linking } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const PgRoomAddress = ({ data }) => {

    const handleOpenMapLink = () => {

        const url = data.room.pg.map;

        // Check if the URL can be opened
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert("Error", "Unable to open maps.");
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <View>
            <Text style={styles.title}>Address</Text>
            <Text style={{ color: '#fff' }}>Visit us for a truly home-like experience.</Text>
            <View style={styles.flex}>
                <Icon name="location-outline" size={20} color="#fff" />
                <Text style={styles.bedText}>{data.room.pg.address}</Text>
            </View>
            <View style={styles.flex}>
                <Icon name="location-outline" size={20} color="#71b100" />
                <TouchableOpacity
                    onPress={handleOpenMapLink}
                >
                    <Text style={[styles.bedText, { color: '#71b100', fontWeight: '500' }]}>Open Location in Maps</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PgRoomAddress

const styles = StyleSheet.create({
    flex: {
        marginLeft: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    justFlex: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        marginBottom: 10,
    },
    PriceTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    bedText: {
        marginLeft: 20,
        color: '#fff'
    }

})