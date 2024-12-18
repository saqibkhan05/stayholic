import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon2 from 'react-native-vector-icons/Ionicons';

const PgViewTopBar = ({ data }) => {
    let Card;
    if (data.room.pg.type === 'boys') {
        Card = () => (
            <View style={styles.boysCard}>
                <Icon2 name="male" size={25} color="#FFFFFF" />
                <Text style={styles.cardText}>Boys</Text>
            </View>
        );
    }
    if (data.room.pg.type === 'girls') {
        Card = () => (
            <View style={styles.girlsCard}>
                <Icon2 name="female" size={25} color="#FFFFFF" />
                <Text style={styles.cardText}>Girls</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>{data.room.pg.name}</Text>
                <Text style={styles.location}>{data.room.pg.location}</Text>
            </View>
            <Card />
        </View>
    );
};

export default PgViewTopBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        // padding: 15,
        // borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
    },
    location: {
        fontSize: 16,
        color: '#fff',
        marginTop: 2,
    },
    boysCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#71b100', // Primary color for boys
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    girlsCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFC0CB', // Primary color for girls
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    cardText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF', // White text for contrast
    },
});
