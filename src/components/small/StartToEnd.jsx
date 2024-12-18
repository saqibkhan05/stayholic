import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import LoadingScreen from '../../screens/LoadingScreen';

const StartToEnd = ({ mealId, onDateRangeChange }) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})

    // useEffect Hook
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



    // Get current date and time
    const currentTime = moment();
    console.log(currentTime);

    const comparisonTime = moment(data.last_order_timing, 'HH:mm:ss');
    console.log(comparisonTime);

    let startDate = moment();

    if (currentTime.isAfter(comparisonTime)) {
        console.log('ok');
        startDate = moment().add(1, 'day')
    }
    else {
        startDate = moment();
    }




    // Calculate start and end dates
    const endDate = startDate.clone().add(1, 'month');

    // Send start and end dates to parent component
    useEffect(() => {
        if (onDateRangeChange) {
            onDateRangeChange(startDate, endDate);
        }
    }, [startDate, endDate, onDateRangeChange]);


    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <View>
            <Text style={styles.title}>Monthly Meal</Text>
            <View style={styles.container}>
                {/* Start Date Box */}
                <View style={styles.dateBox}>
                    <Text style={styles.heading}>Start</Text>
                    <Text style={styles.date}>{startDate.format('YYYY-MM-DD')}</Text>
                </View>

                {/* Timeline Effect */}
                <View style={styles.line} />

                {/* End Date Box */}
                <View style={styles.dateBox}>
                    <Text style={styles.heading}>End</Text>
                    <Text style={styles.date}>{endDate.format('YYYY-MM-DD')}</Text>
                </View>
            </View>
        </View>
    )
}

export default StartToEnd

// Styles for the component
const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 20,
    },
    dateBox: {
        alignItems: 'center',
        padding: 10,
    },
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        color: '#555',
    },
    line: {
        height: 2,
        width: 30,
        backgroundColor: '#888',
        marginHorizontal: 5,
    },
});