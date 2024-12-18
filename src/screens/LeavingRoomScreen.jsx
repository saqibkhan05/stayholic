import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const LeavingRoomScreen = () => {

    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.header}>30 Days Vacant Notice</Text>

                <Text style={styles.paragraph}>
                    I, _______, hereby provide a ______-day notice of my intent to vacate the premises located at Indirapuram, Ghaziabad on or before __________.
                </Text>

                <Text style={styles.paragraph}>
                    The reason for my move is: __________
                </Text>

                <Text style={styles.paragraph}>
                    I understand that my security deposit will be refunded within 7-10 business days of my move-out, minus any outstanding charges or damages to the property. I agree to leave the premises clean and undamaged.
                </Text>

                <Text style={styles.paragraph}>
                    I acknowledge that I am obligated to give __________days' written notice to vacate, as stated in my original agreement.
                </Text>

                <Text style={styles.paragraph}>
                    I understand that I am responsible for paying rent until the end of the agreed-upon term or until a new tenant takes occupancy, whichever comes first.
                </Text>

                <Text style={styles.paragraph}>
                    Please return my security deposit within [7-10 Working days listed in the form] to my bank account.
                </Text>

                <Text style={styles.paragraph}>
                    Banking Name: __________
                </Text>

                <Text style={styles.paragraph}>
                    Name Of Bank (Branch): ______________
                </Text>

                <Text style={styles.paragraph}>
                    Account Number: ______________
                </Text>

                <Text style={styles.paragraph}>
                    IFSC Code: ______________
                </Text>



                {/* Apply Now Button */}
                <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('ApplyLeavingNotice')}>
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default LeavingRoomScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212', // Dark background color
        padding: 20,
    },
    scrollView: {
        paddingBottom: 30, // Space at the bottom of scroll view
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 16,
        color: '#ccc', // Light text color for readability
        marginBottom: 15,
        lineHeight: 24,
    },
    applyButton: {
        backgroundColor: '#71b100', // Button color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    applyButtonText: {
        color: '#fff', // Button text color
        fontSize: 18,
        fontWeight: 'bold',
    },
});
