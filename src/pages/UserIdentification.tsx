import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Container } from './styles';

export const UserIdentification: React.FC = () => {
    const navigation = useNavigation()
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState('')
    const nameRef = useRef()

    useEffect(() => {
        setTimeout(() => {
            nameRef.current.focus()
        }, 500)
    }, [])

    function handleBlur() {
        setIsFocused(false)
        setIsFilled(!!name)
    }

    function handleFocus() {
        setIsFocused(true)
    }

    function handleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    async function handleSubmit() {
        if (!name) {
            return Alert.alert('Aviso!', 'precisamos de seu nome para continuar')
        }

        try {

            await AsyncStorage.setItem("@plantManager:user", name)

            navigation.navigate('Confirmation', {
                title: 'Prontinho!',
                subTitle: 'Agora vamos começar a cuidar das suas \nplantinhas com muito carinho',
                buttonTitle: 'Começar',
                icon: 'bee-flower',
                nextScreen: 'PlantSelect',
            })
        } catch (error) {
            console.log(`Deu ruim: ${error}`)
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={styles.content}>
                <View style={styles.form}>

                    <Icon name={isFilled && !!name ? 'sprout' : 'sprout-outline'} style={styles.emoji} />
                    <Text style={styles.title}> Como podemos {'\n'}chamar você? </Text>

                    <TextInput
                        style={[
                            styles.input, (isFocused || isFilled) && { borderColor: colors.green }
                        ]}
                        ref={nameRef}
                        placeholder="Digite um nome"
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        onChangeText={handleInputChange}
                    />

                    <View style={styles.footer}>
                        <Button onPress={handleSubmit} label="Confirmar" />
                    </View>
                </View>


            </View>
            {/* </TouchableWithoutFeedback> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    title: {
        marginTop: 20,
        lineHeight: 32,
        fontSize: 24,
        color: colors.heading,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20
    }
})
