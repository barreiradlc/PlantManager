import AsyncStorage from "@react-native-async-storage/async-storage"
import { format } from "date-fns"

export interface PlantsProps {
    id: string;
    name: string,
    about: string,
    water_tips: string,
    photo: string,
    dateTimeNotification: Date,
    environments: string[],
    frequency: {
        times: number,
        repeat_every: 'week' | 'day'
    }
}

interface StoragePlantProps {
    [id: string]: {
        data: PlantsProps
    }
}

export async function handleloadPlantList(): Promise<PlantsProps[] | undefined> {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants')
        const plants = data ? (JSON.parse(data)) as StoragePlantProps : []

        const plantsSorted = Object
            .keys(plants)
            .map((plant) => {
                return {
                    ...plants[plant].data,
                    hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
                }
            })
            .sort((a, b) => {
                Math.floor(
                    new Date(a.dateTimeNotification).getTime() / 1000 -
                    Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
                )
            })

        return plantsSorted
    } catch (error) {
        console.error(`Deu ruim: ${error}`)
    }
}
export async function handleSavePlant(plant: PlantsProps) {
    try {
        const data = await AsyncStorage.getItem('@plantmanager:plants')
        const plants = data ? (JSON.parse(data)) as StoragePlantProps : []

        const newPlant = {
            [plant.id]: {
                data: plant
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants',
            (JSON.stringify({
                ...newPlant,
                ...plants
            }))
        )
    } catch (error) {
        console.error(`Deu ruim: ${error}`)
    }
}