import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Occupancy = ({ data }) => {
    let occupancy = '-'
    if (data.room.occupancy == '1') {
        occupancy = 'Private Room'
    }
    if (data.room.occupancy == '2') {
        occupancy = 'Twin Bed Room'
    }
    if (data.room.occupancy == '3') {
        occupancy = 'Tripple Bed Room'
    }

    return (
        <>
            {occupancy}
        </>
    )
}

export default Occupancy

const styles = StyleSheet.create({})