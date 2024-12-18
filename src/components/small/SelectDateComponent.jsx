import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const RangeSelectCalendar = ({ givenTime, onDateRangeChange }) => {
    const [minDate, setMinDate] = useState(null);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({});

    useEffect(() => {
        const currentTime = moment();
        const comparisonTime = moment(givenTime, 'HH:mm:ss');

        let startDate = moment();

        if (currentTime.isAfter(comparisonTime)) {
            console.log('ok');
            startDate = moment().add(1, 'day')
        }
        else {
            startDate = moment();
        }

        setMinDate(startDate.format('YYYY-MM-DD'));

    }, [givenTime]);

    const onDayPress = (day) => {
        const selectedDate = day.dateString;

        if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
            // Start a new range selection
            setSelectedStartDate(selectedDate);
            setSelectedEndDate(null);
            setMarkedDates({
                [selectedDate]: { startingDay: true, endingDay: true, color: '#00adf5', textColor: 'white' },
            });
        } else if (selectedStartDate && !selectedEndDate) {
            // Set the end date, allowing same start and end date
            if (moment(selectedDate).isSameOrAfter(selectedStartDate)) {
                setSelectedEndDate(selectedDate);
                markRangeDates(selectedStartDate, selectedDate);
                const days = moment(selectedDate).diff(moment(selectedStartDate), 'days') + 1;

                // Send data to the parent component
                if (onDateRangeChange) {
                    onDateRangeChange(selectedStartDate, selectedDate, days);
                }
            } else {
                alert('End date must be after or same as the start date');
            }
        }
    };

    const markRangeDates = (start, end) => {
        const range = {};
        let currentDate = moment(start);

        while (currentDate.isSameOrBefore(end)) {
            const formattedDate = currentDate.format('YYYY-MM-DD');
            if (formattedDate === start && formattedDate === end) {
                range[formattedDate] = { startingDay: true, endingDay: true, color: '#00adf5', textColor: 'white' };
            } else if (formattedDate === start) {
                range[formattedDate] = { startingDay: true, color: '#00adf5', textColor: 'white' };
            } else if (formattedDate === end) {
                range[formattedDate] = { endingDay: true, color: '#00adf5', textColor: 'white' };
            } else {
                range[formattedDate] = { color: '#d3e1f5', textColor: 'white' };
            }
            currentDate = currentDate.add(1, 'day');
        }
        setMarkedDates(range);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Select a Date Range</Text>
            <Calendar
                minDate={minDate}
                markingType={'period'}
                markedDates={markedDates}
                onDayPress={onDayPress}
                theme={{
                    selectedDayBackgroundColor: '#00adf5',
                    todayTextColor: '#00adf5',
                    arrowColor: '#00adf5',
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default RangeSelectCalendar;
