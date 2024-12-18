import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PgCard from './PgCard';
import LoadingScreen from '../../screens/LoadingScreen';

const PgRoomList = ({ data }) => {

    const { location, type, catogory, occupancy } = data;

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch locations from API
    useEffect(() => {
        const fetchLocations = async (data) => {
            try {
                const response = await axios.post('https://stayholic.com/api/v1/all_pgs_rooms', {
                    location: location,
                    type: type,
                    category: catogory,
                    occupancy: occupancy,
                });

                const response_data = response.data
                await setLocations(response_data);  // Assuming response has a "locations" array

                setLoading(false);

            } catch (error) {
                console.error('Error fetching locations:', error);
                setLoading(false);
            }
        };

        fetchLocations(data);
    }, [location, type, catogory, occupancy]);

    if (loading) return (
        <View>
            <LoadingScreen />
        </View>
    );

    return (
        <FlatList
            data={locations}
            renderItem={({ item, key }) => (
                <PgCard data={item} key={key} />
            )}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true} // Enables nested scrolling
            ListFooterComponent={<View style={styles.footer} />} // Add footer spacing
        />
    )
}

export default PgRoomList

const styles = StyleSheet.create({
    footer: {
        height: 220,  // Adjust this value to control the spacing height
    },
})