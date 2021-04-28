import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


import wateringImg from '../assets/ilustrawatering.png'
import { Button } from '../components/Button';
import colors from '../styles/colors';

const Welcome: React.FC = () => {
    const navigation = useNavigation()
    const bl = '\n'

    function IconFoward() {
        return <Icon name="chevron-right" color="#fff" style={styles.icon} />
    }

    function handleStart() {
        navigation.navigate('UserIdentification')
    }

    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.title} >Gerencie {bl} suas plantas {bl}de forma fácil</Text>

            <Image resizeMode="contain" style={styles.img} source={wateringImg} />

            <Text style={styles.subTitle} >Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.</Text>

            <View >
                <Button onPress={handleStart} icon={<IconFoward />} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },
    // buttonContainer: {
    //     width: '100%'
    // },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56
    },
    img: {
        width: Dimensions.get('window').width / 0.7
    },
    icon: {
        color: colors.white,
        padding: 12,
        fontSize: 32,
    }
})

export default Welcome;