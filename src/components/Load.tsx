import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import loadAnimation from '../assets/4875-sprout-plant.json'

const Load: React.FC = () => {
    return (
        <View style={styles.container}>
            <LottieView source={loadAnimation} style={styles.animation} autoPlay loop />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        backgroundColor: 'transparent',
        width: Dimensions.get('window').width / 0.7,
        height: Dimensions.get('window').width / 0.7,
    }
})

export default Load;