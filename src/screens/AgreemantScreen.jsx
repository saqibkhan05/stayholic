import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const AgreementScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Text style={styles.header}>StayHolic</Text>
                <Text style={styles.title}>Paying Guest Agreement</Text>

                <Text style={styles.subHeader}>BETWEEN ______AND _____</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Room Details</Text>
                    <Text style={styles.text}>Room Type: ________</Text>
                    <Text style={styles.text}>Room No.: _________</Text>
                    <Text style={styles.text}>AGREEMENT made at this day of  BETWEEN ______here in after referred to as "the Owner" and (i)_________ here in after referred to as "the Paying Guest";</Text>
                    <Text style={styles.text}>WHEREAS the Owner is seized and possessed of and is occupying Plot No.________ situated at Shakti Khand/Niti Khand/Vaibhav Khand/Ahinsa Khand/ Gyan Khand /Noida 2/3/4.</Text>
                    <Text style={styles.text}>AND WHEREAS the Paying Guest have requested the Owner to allow them use of one bedroom/ 1 bed in the aforesaid premises for their own use only on a temporary basis on the terms and conditions here in after written.</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AGREEMENT TERMS</Text>

                    <Text style={styles.text}>1. OCCUPANCY</Text>
                    <Text style={styles.text}>The Owner grants the Paying Guest permission to occupy one bedroom with attached/common bathroom on a paying guest basis.</Text>

                    <Text style={styles.text}>2. TERM</Text>
                    <Text style={styles.text}>This Paying Guest Agreement starts from _ for a minimum period of two months.</Text>

                    <Text style={styles.text}>3. RENT AND PAYMENT TERMS</Text>
                    <Text style={styles.text}>3.1. The Paying Guest shall pay ₹ [Rent Amount] monthly on the 1st day of every month.</Text>
                    <Text style={styles.text}>3.2. Rent includes bathroom and maintenance charges.</Text>
                    <Text style={styles.text}>3.3. The Paying Guest shall pay the entire electricity bill for AC consumption.</Text>
                    <Text style={styles.text}>3.4. Timely payment is required; late payment may cause difficulties.</Text>

                    <Text style={styles.text}>4. SECURITY DEPOSIT</Text>
                    <Text style={styles.text}>4.1. The Paying Guest has paid a security deposit of ₹ [Security Deposit Amount].</Text>
                    <Text style={styles.text}>4.2. The deposit remains with the Owner interest-free until agreement termination.</Text>
                    <Text style={styles.text}>4.3. Minimum stay: 2 months.</Text>
                    <Text style={styles.text}>4.4. Refundable to Paying Guest, subject to deductions for outstanding payments.</Text>

                    <Text style={styles.text}>5. TERMS OF OCCUPANCY</Text>
                    <Text style={styles.text}>5.1 The Paying Guest has been provided keys for temporary use of the allocated room.</Text>
                    <Text style={styles.text}>5.2 Rent and bills must be paid timely. Late payment (beyond 5 days) will incur double charges per day, deducted from the security amount.</Text>
                    <Text style={styles.text}>5.3 No family members or outsiders are allowed to stay in the PG.</Text>
                    <Text style={styles.text}>5.4 Post due date, daily charges apply: Double Sharing (Rs. 700/-) and Triple Sharing (Rs. 500/-).</Text>

                    <Text style={styles.text}>6. KITCHEN USAGE</Text>
                    <Text style={styles.text}>6.1 The Paying Guest may use passages and kitchen for cooking (Tea, Coffee, Maggie, Omelet, etc.).</Text>
                    <Text style={styles.text}>6.2 Induction and basic utensils will be provided.</Text>
                    <Text style={styles.text}>6.3 Guests are responsible for cleaning the kitchen after use.</Text>
                    <Text style={styles.text}>6.4 No disturbance should inconvenience other guests.</Text>

                    <Text style={styles.text}>7. CONDUCT AND TERMINATION</Text>
                    <Text style={styles.text}>7.1 No disturbance is allowed at any time.</Text>
                    <Text style={styles.text}>7.2 Guests/outsiders may enter only with Owner's permission.</Text>
                    <Text style={styles.text}>7.3 Disturbance may lead to wallet suspension and non-refundable security amount.</Text>
                    <Text style={styles.text}>7.4 Two months' minimum stay; one month prior notice required (on 1st or 20th of every month).</Text>
                    <Text style={styles.text}>7.5 Security amount refundable within 5-7 days via NEFT/IMPS after checkout.</Text>
                    <Text style={styles.text}>7.6 Guests paying inclusive of meals, then excluding, must pay difference amount.</Text>
                    <Text style={styles.text}>7.7 Owner not liable for meals on off days/festivals.</Text>
                    <Text style={styles.text}>7.8 Notice to vacate only accepted through mobile application.</Text>

                    <Text style={styles.text}>8. LIABILITY</Text>
                    <Text style={styles.text}>8.1 Paying Guest responsible for damages caused by themselves or outsiders.</Text>
                    <Text style={styles.text}>8.2 Conspiracy/misleading actions may lead to legal action and non-refundable security amount.</Text>

                    <Text style={styles.text}>9. GOVERNING LAW</Text>
                    <Text style={styles.text}>This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction].</Text>

                    <Text style={styles.text}>10. DISPUTE RESOLUTION</Text>
                    <Text style={styles.text}>Any dispute arising out of or in connection with this Agreement shall be resolved through amicable negotiation. If the parties are unable to resolve the dispute amicably, the dispute shall be referred to arbitration.</Text>
                </View>

                <Text style={styles.sectionTitle}>Signatures</Text>
                <Text style={styles.text}>Signature of Owner: _______</Text>
                <Text style={styles.text}>Signature of Paying Guest: _______</Text>
                <Text style={styles.text}>Date: _____ </Text>
                <Text style={styles.text}>Signatures of both parties</Text>

            </ScrollView>
        </View>
    );
};

export default AgreementScreen;

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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#6200ee', // Button color
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
