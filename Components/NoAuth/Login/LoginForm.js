import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { stateInitial } from './StateInitial';
// import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/Ionicons';
import { Input, Icon } from '@rneui/themed';

const LoginForm = (props) => {    
    const initialFormState = stateInitial;
    const [dataForm, setDataForm] = useState(initialFormState)

    const handleChange = (e, name, error, text_error) => {
        setDataForm(prev => ({
            ...prev,
            [name]: e,
            [error]: 'black',
            [text_error]: '',
        }))
    };

    const validate = () => {
        let acum = "";
        if (dataForm.email === '') {
            setDataForm(prev => ({
                ...prev,
                email_error: 'red',
                email_text_error: props.language.t('messageErrorEmailRequired'),
            }))
            acum = 1;
        }
        if (dataForm.email !== '' && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dataForm.email))) {
            setDataForm(prev => ({
                ...prev,
                email_error: 'red',
                email_text_error: props.language.t('messageErrorEmailInvalid'),
            }))
            acum = 1;
        }
        if (dataForm.password === '') {
            setDataForm(prev => ({
                ...prev,
                password_error: 'red',
                password_text_error: props.language.t('messageErrorPasswordRequired'),
            }))
            acum = 1;
        }
        if (acum > 0) {
            return false;
        }
        return true;
    }

    const handleLoginAction = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            dataSend = {
                email: dataForm.email,
                password: dataForm.password,
            }
            setDataForm(prev => ({
                ...prev,
                loading: true
            }))
            props.loginAction(dataSend, props.locale)
        }
    }

    const errorfulOperation = () => {
        setDataForm(prev => ({ ...prev, loading: false }))
    }

    return (
        <View>
            <Input
                placeholder='Email'
                onChangeText={e => { handleChange(e, 'email', 'email_error', 'email_text_error') }}
                value={dataForm.email}
                keyboardType='email-address'
                autoCapitalize="none"
                inputContainerStyle={{ borderColor: dataForm.email_error }}
                errorMessage={dataForm.email_text_error}
                leftIcon={
                    <Icon
                        name='email'
                        size={24}
                        color='black'
                    />
                }
            />
            <Input
                placeholder='Contraseña'
                onChangeText={e => { handleChange(e, 'password', 'password_error', 'password_text_error') }}
                value={dataForm.password}
                keyboardType='default'
                autoCapitalize="none"
                secureTextEntry={dataForm.showHidePassword}
                inputContainerStyle={{ borderColor: dataForm.password_error }}
                errorMessage={dataForm.password_text_error}
                leftIcon={<Icon name='lock' size={24} color='black' />
                }
                rightIcon={
                    <AntDesign
                        name="eye"
                        size={24}
                        color="black"
                        onPress={() => setDataForm(prev => ({ ...prev, showHidePassword: !dataForm.showHidePassword }))}
                    />
                }
            />
            <View style={{ alignItems: 'flex-end' }}>
                <Text
                    style={{ color: '#174ea6' }}
                    onPress={() => { props.navigation.navigate('ForgotPassword') }}
                >
                    ¿Olvido su contraseña?
                </Text>
            </View>
            <Text></Text>
            <Button
                title='Iniciar Sesión'
            // onPress={handleLoginAction}
            />
            <Text></Text>
            <Button
                title='Registrarse'
                onPress={() => {
                    props.navigation.navigate('Registrarse');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {
        //marginBottom: 36,
    },
    linea: {
        backgroundColor: '#DCDCDC',
        height: 2,
    },
    errors: {
        color: '#FF0000',
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default LoginForm;

