import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen';
import DontHaveRoom from '../../components/big/DontHaveRoom';
import HavingRoom from '../../components/big/HavingRoom';
import LoginFirstScreen from '../LoginFirstScreen';

const MyRoom = () => {


    const [loading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);
    const [havingRoom, setHavingRoom] = useState(false)
    const [data, setData] = useState()

    const [isLogin, setIsLogin] = useState(true);


    const getdata = async () => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            const response = await axios.post('https://stayholic.com/api/v1/customer/me', {
                token, token
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            // Handle the response
            console.log(response.data);
            setData(response.data);

            if (response.data.status) {
                setHavingRoom(true)
            }
            setLoading(false)
        }
        else {
            setLoading(false)
            setIsLogin(false);
        }
    }

    const refreshDataHandel = async () => {
        setRefreshing(true)
        getdata();
        setRefreshing(false)
    }

    useEffect(() => {
        getdata();
    }, [])

    // loading screen
    if (loading) {
        return <LoadingScreen />
    }

    if (!isLogin) {
        return <LoginFirstScreen />
    }


    // Main Screen
    return (
        <ScrollView
            style={styles.container}
            nestedScrollEnabled
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={refreshDataHandel}
                />
            }

        >
            {!havingRoom ? <DontHaveRoom /> : <HavingRoom data={data} />}

        </ScrollView>
    )
}

export default MyRoom

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        height: '100%'
    }
})