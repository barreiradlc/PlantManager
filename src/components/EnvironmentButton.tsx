import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';

interface EnvironmentButtonProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

export const EnvironmentButton: React.FC<EnvironmentButtonProps> = ({ title, active = false, ...rest }) => {
    return (
        <RectButton style={[styles.touchable, active && styles.touchableActive]} {...rest}>
            <Text style={[styles.text, active && styles.textActive]}> {title} </Text>
        </RectButton>
    );
}


const styles = StyleSheet.create({
    touchable: {
        backgroundColor: colors.shape,
        height: 40,
        width: 76,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginHorizontal: 5
    },
    touchableActive: {
        fontWeight: 'bold',
        color: colors.green,
        backgroundColor: colors.green_light
    },
    text: {
        color: colors.heading,
    },
    textActive: {

        color: colors.green_dark,

    },
})