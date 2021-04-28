import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/core';

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'bee-flower' | 'bee',
    nextScreen: string;
}

export const Confirmation: React.FC = () => {
    const navigation = useNavigation()
    const route = useRoute()

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen,
    } = route.params as Params

    function handleStart() {
        navigation.navigate(nextScreen)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    <Icon name={icon} size={68} color="#fcba03" />
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subtitle}>
                    {subTitle}
                </Text>
            </View>

            <View style={styles.footer}>
                <Button onPress={handleStart} label={buttonTitle} />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title: {
        fontSize: 22,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 20,
        color: colors.heading
    },
    emoji: {
        fontSize: 32
    },
    footer: {
        width: "100%",
        paddingHorizontal: 75
    }
})
