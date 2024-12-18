import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WelcomeScreen from '../screens/WelcomeScreen'
import LoadingScreen from '../screens/LoadingScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/HomeScreen'
import BottomNavigation from './BottomNavigation'
import SignInScreen from '../screens/auth/SignInScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import OtpScreen from '../screens/auth/OtpScreen'
import RoomViewScreen from '../screens/RoomViewScreen'
import PgRoomPaymentPage from '../screens/PgRoomPaymentPage'
import PgSearchScreen from '../screens/PgSearchScreen'
import FoodSearch from '../screens/FoodSearch'
import FoodItemViewScreen from '../screens/FoodItemViewScreen'
import MealViewScreen from '../screens/MealViewScreen'
import MealOrderScreen from '../screens/MealOrderScreen'
import RefrelCodeScreen from '../screens/RefrelCodeScreen'
import ReserveRoom from '../screens/ReserveRoom'
import AllCouponsScreen from '../screens/AllCouponsScreen'
import LeavingRoomScreen from '../screens/LeavingRoomScreen'
import ApplyLeavingNotice from '../screens/ApplyLeavingNotice'
import AgreemantScreen from '../screens/AgreemantScreen'
import HelpAndSupport from '../screens/HelpAndSupport'
import AgreementDownloadScreen from '../screens/AgreementDownloadScreen'
import InvoiceScreen from '../screens/InvoiceScreen'
import PayRenr from '../screens/PayRenr'
import MealYesNo from '../screens/MealYesNo'
import HotelViewScreen from '../screens/HotelViewScreen'
import HotelRoomViewScreen from '../screens/HotelRoomViewScreen'
import ForgotPassWord from '../screens/auth/ForgotPassWord'
import ForgotPasswordOtpScreen from '../screens/auth/ForgotPasswordOtpScreen'
import ResetPassword from '../screens/auth/ResetPassword'
import HotelBookingScreen from '../screens/HotelBookingScreen'
import PayElectritybill from '../screens/PayElectritybill'

const AppNavigation = () => {
    // variables
    const [isLoading, setLoading] = useState(true)
    const [token, setToken] = useState(true);

    // functions
    const checkFirstLaunch = async () => {
        // get
        const token = await AsyncStorage.getItem('token');

        if (token) {
            setToken(true)
            setLoading(false);
        }
        setToken(false)
        setLoading(false);
    };

    // useEffect
    useEffect(() => {
        checkFirstLaunch();
    }, []);

    const Stack = createNativeStackNavigator();

    // loading screen
    if (isLoading) {
        return <LoadingScreen />
    }

    if (token) {
        // Main Screen
        return (
            // <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {/* Main Screen (Home) */}
                <Stack.Screen name='BottomNavigation' component={BottomNavigation} />

                {/* Auth */}
                <Stack.Screen name='SignInScreen' component={SignInScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                <Stack.Screen name='OtpScreen' component={OtpScreen} />

                {/*  */}
                <Stack.Screen name='PayElectritybill' component={PayElectritybill} />
                <Stack.Screen name='HotelBookingScreen' component={HotelBookingScreen} />
                <Stack.Screen name='ResetPassword' component={ResetPassword} />
                <Stack.Screen name='ForgotPasswordOtpScreen' component={ForgotPasswordOtpScreen} />
                <Stack.Screen name='ForgotPassWord' component={ForgotPassWord} />
                <Stack.Screen name='HotelRoomViewScreen' component={HotelRoomViewScreen} />
                <Stack.Screen name='HotelViewScreen' component={HotelViewScreen} />
                <Stack.Screen name='MealYesNo' component={MealYesNo} />
                <Stack.Screen name='PayRenr' component={PayRenr} />
                <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} />
                <Stack.Screen name='AgreementDownloadScreen' component={AgreementDownloadScreen} />
                <Stack.Screen name='HelpAndSupport' component={HelpAndSupport} />
                <Stack.Screen name='AgreemantScreen' component={AgreemantScreen} />
                <Stack.Screen name='ApplyLeavingNotice' component={ApplyLeavingNotice} />
                <Stack.Screen name='LeavingRoomScreen' component={LeavingRoomScreen} />
                <Stack.Screen name='AllCouponsScreen' component={AllCouponsScreen} />
                <Stack.Screen name='ReserveRoom' component={ReserveRoom} />
                <Stack.Screen name='RefrelCodeScreen' component={RefrelCodeScreen} />
                <Stack.Screen name='MealOrderScreen' component={MealOrderScreen} />
                <Stack.Screen name='MealViewScreen' component={MealViewScreen} />
                <Stack.Screen name='FoodItemViewScreen' component={FoodItemViewScreen} />
                <Stack.Screen name='FoodSearch' component={FoodSearch} />
                <Stack.Screen name='PgSearchScreen' component={PgSearchScreen} />
                <Stack.Screen name='RoomViewScreen' component={RoomViewScreen} />
                <Stack.Screen name='PgRoomPaymentPage' component={PgRoomPaymentPage} />

            </Stack.Navigator>
            // </NavigationContainer>
        )

    } else {
        // Main Screen
        return (
            // <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/* Welcome Screen */}
                <Stack.Screen name='Welcome' component={WelcomeScreen} />
                {/* Main Screen (Home) */}
                <Stack.Screen name='BottomNavigation' component={BottomNavigation} />
                {/* Auth */}
                <Stack.Screen name='SignInScreen' component={SignInScreen} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
                <Stack.Screen name='OtpScreen' component={OtpScreen} />


                {/*  */}
                <Stack.Screen name='PayElectritybill' component={PayElectritybill} />
                <Stack.Screen name='HotelBookingScreen' component={HotelBookingScreen} />
                <Stack.Screen name='ResetPassword' component={ResetPassword} />
                <Stack.Screen name='ForgotPasswordOtpScreen' component={ForgotPasswordOtpScreen} />
                <Stack.Screen name='ForgotPassWord' component={ForgotPassWord} />
                <Stack.Screen name='HotelRoomViewScreen' component={HotelRoomViewScreen} />
                <Stack.Screen name='HotelViewScreen' component={HotelViewScreen} />
                <Stack.Screen name='MealYesNo' component={MealYesNo} />
                <Stack.Screen name='PayRenr' component={PayRenr} />
                <Stack.Screen name='InvoiceScreen' component={InvoiceScreen} />
                <Stack.Screen name='AgreementDownloadScreen' component={AgreementDownloadScreen} />
                <Stack.Screen name='HelpAndSupport' component={HelpAndSupport} />
                <Stack.Screen name='AgreemantScreen' component={AgreemantScreen} />
                <Stack.Screen name='ApplyLeavingNotice' component={ApplyLeavingNotice} />
                <Stack.Screen name='LeavingRoomScreen' component={LeavingRoomScreen} />
                <Stack.Screen name='AllCouponsScreen' component={AllCouponsScreen} />
                <Stack.Screen name='ReserveRoom' component={ReserveRoom} />
                <Stack.Screen name='RefrelCodeScreen' component={RefrelCodeScreen} />
                <Stack.Screen name='MealOrderScreen' component={MealOrderScreen} />
                <Stack.Screen name='MealViewScreen' component={MealViewScreen} />
                <Stack.Screen name='FoodItemViewScreen' component={FoodItemViewScreen} />
                <Stack.Screen name='FoodSearch' component={FoodSearch} />
                <Stack.Screen name='PgSearchScreen' component={PgSearchScreen} />
                <Stack.Screen name='RoomViewScreen' component={RoomViewScreen} />
                <Stack.Screen name='PgRoomPaymentPage' component={PgRoomPaymentPage} />

            </Stack.Navigator>
            // </NavigationContainer>
        )

    }

}

export default AppNavigation

const styles = StyleSheet.create({})