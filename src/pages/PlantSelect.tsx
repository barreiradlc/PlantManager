import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { Header } from '../components/Header';
import Load from '../components/Load';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { PlantsProps } from '../libs/storage';
import { api } from '../services/api';
import colors from '../styles/colors';

interface EnvironmentProps {
    key: string;
    title: string;
}

export const PlantSelect: React.FC = () => {
    const navigation = useNavigation()
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([] as EnvironmentProps[])
    const [plants, setPlants] = useState<PlantsProps[]>([] as PlantsProps[])
    const [environmentSelected, setEnvironmentSelected] = useState('all')

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(true)

    useEffect(() => {
        fetchEnvironments()
        fetchPlants()
    }, [])

    function handleFetchMore(distance: number) {

        console.log(distance)

        if (distance < 1) {
            return
        }
        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    const plantsfiltered = useMemo(() => {
        if (environmentSelected === 'all') {
            return plants
        }

        return plants.filter(plant => plant.environments.includes(environmentSelected))
    }, [environmentSelected, plants])

    function handleEnvironmentSelect(environment: string) {
        setEnvironmentSelected(environment)
    }

    async function fetchPlants() {
        const { data } = await api.get(`/plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if (page === 1) {
            setPage(page + 1)
            setPlants(data)
        } else {
            setPage(page + 1)
            setPlants(oldValue => [...oldValue, ...data])
        }

        setLoadingMore(!data.length)
    }

    async function fetchEnvironments() {
        const { data } = await api.get(`/plants_environments?_sort=title&_order=asc`)
        setEnvironments([
            {
                key: 'all',
                title: 'Todos'
            },
            ...data
        ])
    }
    async function handlePlatSelect(plant: PlantsProps) {
        navigation.navigate('PlantSave', { plant })
    }

    const loading = useMemo(() => {
        console.log("load")
        console.log(!!plants.length)
        console.log(!!environments.length)

        if (!!plants.length && !!environments.length) {
            return false
        }
        return true
    }, [plants, environments])

    if (loading) return <Load />;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subTitle}>Você quer colocar a sua planta?</Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={environmentSelected === item.key}
                            onPress={() => handleEnvironmentSelect(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFetchMore(distanceFromEnd)
                    }
                    data={plantsfiltered}
                    renderItem={({ item }) => <PlantCardPrimary data={item} key={item.id} onPress={() => handlePlatSelect(item)} />}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.plantList}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListFooterComponent={
                        !loadingMore ? <ActivityIndicator color={colors.green} size='large' /> : null
                    }
                />
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading
    },
    subTitle: {},
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plantList: {

    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})