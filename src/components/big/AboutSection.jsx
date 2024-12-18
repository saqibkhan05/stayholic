import { Button, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import AboutCard from './AboutCard'
import { useNavigation } from '@react-navigation/native'

const AboutSection = ({ navigation }) => {

    const imageUrl = 'https://stayholic.com/storage/boys.jpg';
    const title = 'Boys PG';
    const tagline = '"Freedom, Comfort, Convenience"';

    const imageUrl2 = 'https://stayholic.com/storage/girls.jpg';
    const title2 = 'Girls PG';
    const tagline2 = '"Safe, Secure, Serene"';

    const hander = () => {
        console.log('inside function');
        // navigation.navigate('PgSearchScreen')
    }

    return (
        <>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500', paddingTop: 20 }} >Know About StayHolic</Text>
            <Text style={{color:'#fff'}} >Comfortable, Secure, and Affordable Living Spaces</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>


                <AboutCard
                    style={styles.card}
                    imageUrl={imageUrl}
                    title={title}
                    tagline={tagline}
                    nav='PgSearchScreen'
                    navprop='boys'
                />
                <AboutCard
                    style={styles.card}
                    imageUrl={imageUrl2}
                    title={title2}
                    tagline={tagline2}
                    nav='PgSearchScreen'
                    navprop='girls'
                />

            </View>
        </>
    )
}

export default AboutSection

const styles = StyleSheet.create({

})