import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            {/* Logo at the center */}

            {/* Loading indicator */}
            <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />

            {/* Optional text below the loading indicator */}
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,                     // Fills the entire screen
        justifyContent: 'center',    // Centers the content vertically
        alignItems: 'center',        // Centers the content horizontally
        backgroundColor: '#fff',     // Background color of the loading screen
    },
    logo: {
        width: 150,                  // Adjust the logo width
        height: 150,                 // Adjust the logo height
        marginBottom: 20,            // Space between logo and loader
    },
    loader: {
        marginBottom: 10,            // Space between loader and text
    },
    loadingText: {
        fontSize: 16,                // Font size for loading text
        color: '#333',               // Text color
    },
});

export default LoadingScreen;
