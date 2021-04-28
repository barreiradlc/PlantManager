import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Header } from '../components/Header';

import waterdrop from '../assets/waterdrop.png'
import { handleloadPlantList, PlantsProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import Load from '../components/Load';
import { FlatList } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import { color } from 'react-native-reanimated';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

const MyPlants: React.FC = () => {
    const [plants, setPlants] = useState<PlantsProps[]>()
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState('')

    useEffect(() => {
        getPlants()
    }, [])

    async function getPlants() {
        const data = await handleloadPlantList()

        console.log(data[0])

        if (data) {
            const nextTime = formatDistance(
                new Date(data[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWatered(
                `Não se esqueça de regar a ${data[0].name} em ${nextTime}`
            )
        }

        setPlants(data)
        setLoading(false)
    }

    if (loading) return <Load />;

    return (
        <View style={styles.container}>
            <Header />

            <View style={styles.spotligth}>
                <Image source={waterdrop} style={styles.spotligthImage} />

                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas a regar
                </Text>

                <FlatList
                    data={plants}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PlantCardSecondary data={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotligth: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60,

    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,

    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        color: colors.heading,
        marginVertical: 20
    }
})


export default MyPlants;