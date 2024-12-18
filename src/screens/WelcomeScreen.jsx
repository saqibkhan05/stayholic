import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, withSequence, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const WelcomeScreen = ({ navigation }) => {
    // Array of background images
    const backgroundImages = [
        require('../assets/welcome-1.jpg'),
        require('../assets/welcome-2.jpg'),
        require('../assets/welcome-3.jpg'),
    ];

    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

    // Shared animated value for Reanimated
    const fadeAnim = useSharedValue(0);

    // Quotes for the slider
    const quotes = [
        "Welcome to StayHolic residences.",
        "Discover luxury living.",
        "Experience the best services."
    ];

    // Animated styles for the fading background
    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            opacity: fadeAnim.value,
        };
    });

    useEffect(() => {
        const fadeInOut = () => {
            fadeAnim.value = withSequence(
                withTiming(1, { duration: 4000 }), // Fade in
                withTiming(0, { duration: 4000 })  // Fade out
            );
        };

        const interval = setInterval(() => {
            fadeInOut(); // Trigger fade in/out animation
            setCurrentBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
        }, 6000);

        fadeInOut(); // Start animation immediately
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    const renderQuote = (index) => (
        <View style={styles.quoteContainer} key={index}>
            <Text style={styles.quoteText}>{quotes[index]}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Fading background */}
            <Animated.View style={[styles.backgroundWrapper, animatedBackgroundStyle]}>
                <ImageBackground
                    source={backgroundImages[currentBackgroundIndex]}
                    style={styles.background}
                    resizeMode="cover"
                />
            </Animated.View>

            {/* Overlay Content */}
            <View style={styles.overlay}>
                <Image source={require('../assets/logo.jpg')} style={styles.logo} />

                {/* Quotes Slider */}
                <View style={styles.sliderContainer}>
                    <Carousel
                        width={300}
                        height={150}
                        loop
                        autoPlay
                        autoPlayInterval={5000}
                        scrollAnimationDuration={2000}
                        data={[0, 1, 2]} // Dummy data
                        renderItem={({ index }) => renderQuote(index)}
                    />
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('BottomNavigation')}>
                        <LinearGradient colors={['#5a5a5a', '#1c1c1c']} style={styles.button}>
                            <Text style={styles.buttonText}>Explore Residences</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('SignInScreen')}>
                        <LinearGradient colors={['#000', '#000']} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 40,
    },
    logo: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quoteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        paddingHorizontal: 20,
    },
    quoteText: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    exploreButton: {
        marginBottom: 10,
        elevation: 8,
    },
    loginButton: {
        elevation: 8,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
