import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();  // To navigate back to the previous screen
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>Terms and Conditions</Text>
                <Text style={styles.content}>
                    By accessing this app, you agree to comply with these terms:
                </Text>

                {/* Bullet List */}
                <View style={styles.bulletContainer}>
                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Occupancy and Room Use</Text>: The Paying Guest (PG) is allowed to occupy one bedroom with attached/common bathroom. Room keys are provided for temporary use; no family members or outsiders are allowed to stay.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Agreement Duration</Text>: The minimum stay period is two months from the start date. Extensions are subject to mutual agreement.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Rent and Payment</Text>: Monthly rent of ₹[Rent Amount] is due on the 1st of each month. Rent includes bathroom maintenance charges. Electricity for AC usage is billed separately. Late payments over 5 days incur a double daily charge, deducted from the security deposit.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Security Deposit</Text>: A refundable, interest-free security deposit of ₹[Security Deposit Amount] is required. Refunds are subject to deductions for outstanding dues and damages, with a minimum two-month stay required.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Kitchen Use</Text>: Limited kitchen access is available for basic cooking; cleaning is the guest’s responsibility. Induction and basic utensils are provided. Usage should not disturb other guests.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Guest Conduct</Text>: No disturbances are allowed, and outsiders require the Owner’s permission to enter. Violations may result in wallet suspension and forfeiture of the security deposit. A one-month notice is required before vacating.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Liability</Text>: The PG is responsible for any damages caused by themselves or their visitors. Any misconduct may lead to legal action and forfeiture of the security deposit.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Meal Options</Text>: Meal plans include breakfast, lunch, and dinner on weekdays and weekends. The Owner is not responsible for meals on holidays or festivals.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Notice of Vacating</Text>: A formal written notice is required to vacate, within 24-48 hours for security deposit refund via NEFT/IMPS after checkout. The guest remains responsible for rent until a new tenant takes occupancy.
                        </Text>
                    </View>

                    <View style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                        <Text style={styles.bulletText}>
                            <Text style={styles.boldText}>Governing Law and Dispute Resolution</Text>: The agreement is governed by the laws of [Jurisdiction]. Disputes unresolved amicably will proceed to arbitration.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#121212', // Dark background color
    },
    scrollContainer: {
        paddingVertical: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff', // White text for the heading
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10,
        color: '#ddd', // Light gray text for content
    },
    bulletContainer: {
        paddingLeft: 10,  // To give some space before the bullets
    },
    bulletItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bulletPoint: {
        fontSize: 18,
        lineHeight: 24,
        marginRight: 6,
        color: '#fff', // White bullet points
    },
    bulletText: {
        flex: 1,  // Take the remaining space
        fontSize: 16,
        lineHeight: 24,
        color: '#ddd', // Light gray bullet text
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default TermsAndConditionsScreen;
