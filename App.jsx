import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import AppNavigation from './src/navigations/AppNavigation';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, navigate } from './src/navigations/NavigationService';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {

  const askForPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    }

    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  };

  // useEffect(() => {
  //   askForPermission();

  //   const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
  //     const { title, body } = remoteMessage.notification;
  //     displayNotification(title, body, remoteMessage.data);
  //   });

  //   const unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
  //     if (remoteMessage) {
  //       navigate('HelpAndSupport'); // Use navigate from NavigationService
  //     }
  //   });

  //   return () => {
  //     unsubscribeForeground();
  //     unsubscribeBackground();
  //   };
  // }, []);

  const displayNotification = async (title, body) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'default',
      vibration: true,
      importance: AndroidImportance.HIGH,
      vibrationPattern: [300, 500],
    });

    notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        smallIcon: 'ic_notification', // Set your custom icon here
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
