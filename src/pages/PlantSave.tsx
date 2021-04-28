import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { color } from 'react-native-reanimated';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';


// import { Container } from './styles';
import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import { handleloadPlantList, handleSavePlant, PlantsProps } from '../libs/storage';

interface RouteInterface {
    plant: PlantsProps
}

export const PlantSave: React.FC = () => {
    const navigation = useNavigation()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>()

    const route = useRoute()
    const { plant } = route.params as RouteInterface

    function onChangeDate(event: Event, dateTime?: Date) {
        if (Platform.OS === 'android') {
            setShowDateTimePicker(oldState => !oldState)
        }

        if (dateTime) {
            setSelectedDate(dateTime)
        }
    }

    async function handleConfirm() {
        // const data = await handleloadPlantList()
        // return console.log(data)
        try {
            await handleSavePlant({
                ...plant,
                dateTimeNotification: selectedDate
            })

            navigation.navigate('Confirmation', {
                title: 'Tudo certo!',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você \nde cuidar da sua plantinha com muito carinho',
                buttonTitle: 'Muito',
                icon: 'bee',
                nextScreen: 'PlantSelect',
            })
            // 
            // navigation.goBack()
        } catch (error) {
            Alert.alert('Erro', 'náo foi possivel salvar os dados')
        }
    }

    return (

        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    width={150}
                    height={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>

                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>

            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horário a ser lembrado
                </Text>

                <DateTimePicker
                    testID="dateTimePicker"
                    value={selectedDate}
                    mode='time'
                    display="spinner"
                    onChange={onChangeDate}
                />

                <Button onPress={handleConfirm} label="Cadastrar planta" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace()
    },
    plantName: {
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 12,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.heading,
        marginBottom: 5
    }
})
