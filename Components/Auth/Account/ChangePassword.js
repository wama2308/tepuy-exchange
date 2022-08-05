import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import { Input } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/Ionicons';
import { changePasswordUserAction } from '../../../Actions/UsersActions'
import { flashMessageAction } from '../../../Helpers/Herlpers'

function ChangePassword(props) {
    const { navigation } = props;
    const [currentPassword, setCurrentPassword] = useState('')
    const [currentPasswordError, setCurrentPasswordError] = useState('')
    const [currentPasswordTextError, setCurrentPasswordTextError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordTextError, setPasswordTextError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [confirmPasswordTextError, setConfirmPasswordTextError] = useState('')
    const [showHideCurrentPassword, setShowHideCurrentPassword] = useState(true)
    const [showHidePassword, setShowHidePassword] = useState(true)
    const [showHidePasswordConfirm, setShowHidePasswordConfirm] = useState(true)
    const [loading, setLoading] = useState(false)

    const handleChange = (e, name) => {
        if (name === 'password') {
            setPassword(e);
            setPasswordError('black');
            setPasswordTextError('');
        } else if (name === 'confirmPassword') {
            setConfirmPassword(e);
            setConfirmPasswordError('black');
            setConfirmPasswordTextError('');
        } else {
            setCurrentPassword(e);
            setCurrentPasswordError('black');
            setCurrentPasswordTextError('');
        }
    };

    const validate = () => {
        let acum = "";
        if (currentPassword === '') {
            setCurrentPasswordError('red');
            setCurrentPasswordTextError('Ingrese la contraseña actual');
            acum = 1;
        }
        // if (currentPassword !== '' && currentPassword.length < 6) {
        //     setCurrentPasswordError('red');
        //     setCurrentPasswordTextError(screenProps.language.t('passwordUserTextErrorLength'));
        //     acum = 1;
        // }
        if (password === '') {
            setPasswordError('red');
            setPasswordTextError('Ingrese la nueva contraseña');
            acum = 1;
        }
        if (password !== '' && password.length < 6) {
            setPasswordError('red');
            setPasswordTextError('La contraseña nueva debe contener al menos 6 caracteres');
            acum = 1;
        }
        if (confirmPassword === '') {
            setConfirmPasswordError('red');
            setConfirmPasswordTextError('Ingrese la confirmacion de la nueva contraseña');
            acum = 1;
        }
        if (confirmPassword !== '' && confirmPassword.length < 6) {
            setConfirmPasswordError('red');
            setConfirmPasswordTextError('La confirmacion de la contraseña debe contener al menos 6 caracteres');
            acum = 1;
        }
        if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
            setConfirmPasswordError('red');
            setConfirmPasswordTextError('Las contraseñas deben coincidir');
            acum = 1;
        }

        if (acum > 0) {
            return false;
        }
        return true;
    }

    const handleChangePasswordUserAction = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            setLoading(true)
            changePasswordUserAction({ currentPassword, password })
                .then(() => {
                    flashMessageAction('Contraseña cambiada con éxito', 'success');
                    navigation.navigate("Cuenta");
                })
                .catch(() => {
                    setLoading(false)
                })
        }
    }

    return (
        !loading ?
            <View style={styles.container}>
                <Input
                    placeholder='Contraseña actual'
                    onChangeText={e => { handleChange(e, 'currentPassword') }}
                    value={currentPassword}
                    keyboardType='default'
                    autoCapitalize="none"
                    secureTextEntry={showHideCurrentPassword}
                    inputContainerStyle={{ borderColor: currentPasswordError }}
                    errorMessage={currentPasswordTextError}
                    rightIcon={
                        <AntDesign
                            name="eye"
                            size={24}
                            color="black"
                            onPress={() => setShowHideCurrentPassword(!showHideCurrentPassword)}
                        />
                    }
                />
                <Input
                    placeholder='Nueva contraseña'
                    onChangeText={e => { handleChange(e, 'password') }}
                    value={password}
                    keyboardType='default'
                    autoCapitalize="none"
                    secureTextEntry={showHidePassword}
                    inputContainerStyle={{ borderColor: passwordError }}
                    errorMessage={passwordTextError}
                    rightIcon={
                        <AntDesign
                            name="eye"
                            size={24}
                            color="black"
                            onPress={() => setShowHidePassword(!showHidePassword)}
                        />
                    }
                />
                <Input
                    placeholder='Confirmar nueva contraseña'
                    onChangeText={e => { handleChange(e, 'confirmPassword') }}
                    value={confirmPassword}
                    keyboardType='default'
                    autoCapitalize="none"
                    secureTextEntry={showHidePasswordConfirm}
                    inputContainerStyle={{ borderColor: confirmPasswordError }}
                    errorMessage={confirmPasswordTextError}
                    rightIcon={
                        <AntDesign
                            name="eye"
                            size={24}
                            color="black"
                            onPress={() => setShowHidePasswordConfirm(!showHidePasswordConfirm)}
                        />
                    }
                />
                <Text></Text>
                <Button
                    title='Cambiar contraseña'
                    onPress={handleChangePasswordUserAction}
                />
            </View>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default ChangePassword;