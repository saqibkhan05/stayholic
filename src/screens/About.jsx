import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview'; // Import WebView

const About = () => {
    return (
        <View style={styles.container}>
            {/* WebView component to open a browser inside the app */}
            <WebView
                source={{ uri: 'https://www.stayholic.com/about' }}  // URL to load
                style={styles.webView}
            />
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webView: {
        flex: 1,
    },
});