import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import colors from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

import dog from '../assets/alou.jpg'

export const Header: React.FC = () => {
    const [username, setUsername] = useState('')

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {
        const data = await AsyncStorage.getItem("@plantManager:user")
        setUsername(String(data))
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.grettingsTitle}>Olá,</Text>
                <Text style={styles.grettings}>{username}</Text>
            </View>

            <Image source={dog} style={styles.img} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 40
    },
    grettingsTitle: {
        fontSize: 32,
        color: colors.heading
    },
    grettings: {
        fontSize: 32,
        color: colors.heading,
        lineHeight: 40
    }
})