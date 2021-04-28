import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

import colors from '../styles/colors';

interface ButtonProps extends TouchableOpacityProps {
    icon?: any;
    label?: string;
}

export const Button: React.FC<ButtonProps> = ({ icon, label, ...rest }) => {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.7} {...rest}>
            {label && (
                <Text style={styles.buttonLabel}> {label} </Text>
            )}

            {icon &&
                icon
            }

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,

        marginHorizontal: 24
    },
    buttonLabel: {
        color: colors.white,
        padding: 20
    }
})