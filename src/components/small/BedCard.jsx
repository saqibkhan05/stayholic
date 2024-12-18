import { TouchableOpacity, Dimensions, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';



const BedCard = ({ data }) => {

    const Bed = ({ bed, mkey }) => {
        return (
            <>
                <TouchableOpacity style={styles.bedcard}>
                    <View style={styles.flex}>
                        <Icon name="bed-outline" size={20} color="#fff" />
                        <Text style={[styles.bedcardtext, { marginLeft: 5 }]}>Bed {mkey + 1}</Text>
                    </View>
                    <Text style={styles.bedcardtext}>Book Now</Text>
                </TouchableOpacity>
            </>
        )
    }

    const NoBed = ({ bed, mkey }) => {
        console.log(mkey);
        return (
            <>
                <View style={styles.bedcardN}>
                    <View style={styles.flex}>
                        <Icon name="bed-outline" size={20} color="#fff" />
                        <Text style={[styles.bedcardtext, { marginLeft: 5 }]}>Bed {mkey + 1}</Text>
                    </View>
                    <Text style={styles.bedcardtext}>Occupied</Text>
                </View>
            </>
        )
    }

    return (
        <>
            {data.map((item, key) => (
                <View style={styles.cardContainer}>
                    {!item.status ? <Bed bed={item} mkey={key} /> : <NoBed bed={item} mkey={key} />}
                </View>
            ))}
        </>
    )
}

export default BedCard

const styles = StyleSheet.create({
    // 
    cardContainer: {
        alignItems: 'center',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignContent: 'center',
    },
    bedcard: {
        width: width * 0.9,
        height: 60,
        borderColor: 'gray',
        margin: 5,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 12,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: '#0096FF',
    },
    bedcardN: {
        width: width * 0.9,
        height: 60,
        borderColor: 'gray',
        margin: 5,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: 12,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        flex: 1,
        backgroundColor: '#FFB2B2',
    },
    bedcardtext: {
        color: 'white',
        fontWeight: 'bold',
    },
    flex: {
        flexDirection: 'row',      // Align items in a row
        alignItems: 'center',      // Vertically center items
        // justifyContent: 'space-between',  // Horizontally center items
    },
    flex2: {
        flexDirection: 'row',      // Align items in a row
        alignItems: 'center',      // Vertically center items
        justifyContent: 'center',  // Horizontally center items
    }
})