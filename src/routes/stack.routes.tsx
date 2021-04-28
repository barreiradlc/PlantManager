import { createStackNavigator } from "@react-navigation/stack"
import { Confirmation } from "../pages/Confirmation"
import { UserIdentification } from "../pages/UserIdentification"
import Welcome from "../pages/Welcome"
import colors from "../styles/colors"
import React from 'react'
import { PlantSelect } from "../pages/PlantSelect"
import { PlantSave } from "../pages/PlantSave"
import MyPlants from "../pages/MyPlants"
import { AuthRoutes } from "./tab.routes"

const Stack = createStackNavigator()

export const StackRoutes: React.FC = () => (
    <Stack.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <Stack.Screen
            name="Welcome"
            component={Welcome}
        />

        <Stack.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <Stack.Screen
            name="Confirmation"
            component={Confirmation}
        />

        <Stack.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />

        <Stack.Screen
            name="PlantSave"
            component={PlantSave}
        />

        <Stack.Screen
            name="MyPlants"
            component={MyPlants}
        />

    </Stack.Navigator>
)

export default StackRoutes