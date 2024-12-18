import { Button, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import AboutCard from './AboutCard'
import AboutCard2 from '../small/AboutCard2';

const AboutSectionFood = () => {
    const imageUrl = 'https://stayholic.com/storage/meals.jpg';
    const title = 'Meals';
    const tagline = '"Nutritious, Delicious, Homemade"';

    const imageUrl2 = 'https://stayholic.com/storage/hotel.jpg';
    const title2 = 'Hotels';
    const tagline2 = 'Relaxed Comfort stay';

    return (
        <>
            <Text style={{ fontSize: 18, color: '#fff', fontWeight: '500', paddingTop: 20 }} >Know About StayHolic</Text>
            <Text style={{ color: '#fff' }} >Luxury, Comfort, and Memorable Stays</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                <AboutCard2
                    style={styles.card}
                    imageUrl={imageUrl}
                    title={title}
                    tagline={tagline}
                    nav='FoodScreen'
                />
                <AboutCard2
                    style={styles.card}
                    imageUrl={imageUrl2}
                    title={title2}
                    tagline={tagline2}
                    nav='HotelScreen'
                />

            </View>
        </>
    )
}

export default AboutSectionFood

const styles = StyleSheet.create({

})