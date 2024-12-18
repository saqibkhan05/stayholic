import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const TopBar = () => {

    const navigation = useNavigation();
    const [login, setlogin] = useState(false);
    const [customerData, setCustomerData] = useState({});

    const user = useSelector((state) => state.user.user)
    const isLogin = useSelector((state) => state.user.isLogin)




    if (!isLogin) {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingTop: 20 }}>
                <View>
                    {/* <Image source={require('../../assets/logo-c.png')} style={{ width: 40, height: 40 }} /> */}
                    <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'baseline' }}>
                        <Text style={styles.title}>Hello,</Text>
                        <Text style={styles.title2}> Guest</Text>
                    </View>
                    <Text style={{ color: '#fff' }}>Let's Find Out Your Stay !!!</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SignInScreen') }}
                    >
                        <Icon name="login" size={30} color="#fff" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                <Icon2 name="call-outline" size={25} color="#FF6347" />
            </TouchableOpacity> */}
                </View>
            </View>
        )
    }

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10 }}>
            <View>
                {/* <Image source={require('../../assets/logo-c.png')} style={{ width: 40, height: 40 }} /> */}
                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'baseline' }}>
                    <Text style={styles.title}>Hello, </Text>
                    <Text style={styles.title2}>{user.name}</Text>
                </View>
                <Text style={{ color: '#fff' }}>Let's Find Your Ideal Stay !!!</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('BottomNavigation', { screen: 'ProFileNavigation' }) }}
                    style={{ borderWidth: 1, borderRadius: 50, padding: 7, borderColor: '#fff' }}
                >
                    <Icon2 name="notifications" size={22} color="#fff" />
                </TouchableOpacity>
                {/* <TouchableOpacity>
                <Icon2 name="call-outline" size={25} color="#FF6347" />
            </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    avtar: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
})