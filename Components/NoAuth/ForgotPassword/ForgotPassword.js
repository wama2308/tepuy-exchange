import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import { Input } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { forgotPasswordAction } from '../../../Actions/UsersActions';
import { flashMessageAction } from '../../../Helpers/Herlpers';

const ForgotPassword = (props) => {
    const { navigation } = props;
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [emailTextError, setEmailTextError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => { }, [])

    const handleChange = (e) => {
        setEmail(e);
        setEmailError('black');
        setEmailTextError('');
    };

    const validate = () => {
        let acum = "";
        if (email === '') {
            setEmailError('red');
            setEmailTextError('El email es requerido');
            acum = 1;
        }
        if (email !== '' && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))) {
            setEmailError('red');
            setEmailTextError('Email inválido');
            acum = 1;
        }
        if (acum > 0) {
            return false;
        }
        return true;
    }

    const handleForgotPasswordAction = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            setLoading(true)
            forgotPasswordAction(email)
                .then(() => {
                    flashMessageAction('Correo electrónico de recuperación de contraseña enviado correctamente', 'success');
                    navigation.goBack()
                })
                .catch((error) => {
                    console.log("code ", error.code)
                    console.log("code ", error.message)
                    if (error.code === 'auth/user-not-found') {
                        flashMessageAction('Usuario no encontrado', 'warning');
                    } else {
                        flashMessageAction('Error al enviar correo electrónico de recuperación de contraseña', 'warning');
                    }
                    setLoading(false)
                })
        }
    }

    return (
        !loading ?
            <View style={styles.container}>
                <Input
                    placeholder='Email'
                    onChangeText={e => { handleChange(e, 'email', 'emailError', 'emailTextError') }}
                    value={email}
                    keyboardType='email-address'
                    autoCapitalize="none"
                    inputContainerStyle={{ borderColor: emailError }}
                    errorMessage={emailTextError}
                    leftIcon={
                        <MaterialIcons name="email" size={24} color="black" />
                    }
                />
                <Text></Text>
                <Button
                    title='Recuperar Contraseña'
                    onPress={handleForgotPasswordAction}
                />
            </View>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    );
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default ForgotPassword;