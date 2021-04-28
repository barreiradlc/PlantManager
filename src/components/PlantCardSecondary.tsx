import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';
import colors from '../styles/colors';

interface PlantCardPrimaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
}

export const PlantCardSecondary: React.FC<PlantCardPrimaryProps> = ({ data, ...rest }) => {
    return (
        <RectButton style={styles.container} {...rest} >
            <SvgFromUri uri={data.photo} width={50} height={50} />
            <Text style={styles.text}>
                {data.name}
            </Text>
            <View style={styles.details}>
                <Text style={styles.timeLabel}>
                    Regar às
                </Text>
                <Text style={styles.time}>
                    {data.hour}
                </Text>
            </View>
        </RectButton>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 25,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.shape,
        marginVertical: 5
    },
    text: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        color: colors.heading
    },
    details: {
        alignItems: 'flex-end'
    },
    timeLabel: {
        fontSize: 16,
        color: colors.body_light
    },
    time: {
        marginTop: 5,
        fontSize: 16,
        color: colors.body_dark
    }
})