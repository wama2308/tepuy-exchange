import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from '@rneui/themed';
import AntDesign from '@expo/vector-icons/Ionicons';
import { stateInitial } from './StateInitial';
import { flashMessageAction } from '../../../Helpers/Herlpers';


const RegisterForm = (props) => {
    const initialFormState = stateInitial;
    const [dataForm, setDataForm] = useState(initialFormState)

    useEffect(() => {
        if (props.businessSelect) {
            setDataForm(prev => ({
                ...prev,
                loading: false
            }))
        }
    }, [props.businessSelect])

    const handleChange = (e, name, error, text_error) => {
        setDataForm(prev => ({
            ...prev,
            [name]: e,
            [error]: 'black',
            [text_error]: '',
        }))
    };

    const validate = () => {
        //dateLocationDevice().then(data => console.log(transformDateUnix(data.timestamp)))
        let acum = "";
        if (dataForm.name === '') {
            setDataForm(prev => ({
                ...prev,
                name_error: 'red',
                name_text_error: 'El nombre es requerido',
            }))
            acum = 1;
        }
        if (dataForm.surname === '') {
            setDataForm(prev => ({
                ...prev,
                surname_error: 'red',
                surname_text_error: 'El apellido es requerido',
            }))
            acum = 1;
        }
        if (dataForm.email === '') {
            setDataForm(prev => ({
                ...prev,
                email_error: 'red',
                email_text_error: 'El email es requerido',
            }))
            acum = 1;
        }
        if (dataForm.email !== '' && (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(dataForm.email))) {
            setDataForm(prev => ({
                ...prev,
                email_error: 'red',
                email_text_error: 'Email invalido',
            }))
            acum = 1;
        }
        if (dataForm.phone === '') {
            setDataForm(prev => ({
                ...prev,
                phone_error: 'red',
                phone_text_error: 'El telefono es requerido',
            }))
            acum = 1;
        }
        if (dataForm.type_person === '') {
            setDataForm(prev => ({
                ...prev,
                type_person_error: 'red',
                type_person_text_error: 'Debe seleccionar el tipo de persona',
            }))
            acum = 1;
        }
        if (dataForm.referred === '') {
            setDataForm(prev => ({
                ...prev,
                referred_error: 'red',
                referred_text_error: 'Debe seleccionar si es referido o no',
            }))
            acum = 1;
        }
        if (dataForm.referred === 'si' && dataForm.business === '') {
            setDataForm(prev => ({
                ...prev,
                business_error: 'red',
                business_text_error: 'Debe seleccionar quien lo refirio',
            }))
            acum = 1;
        }
        if (dataForm.password === '') {
            setDataForm(prev => ({
                ...prev,
                password_error: 'red',
                password_text_error: 'La contraseña es requerida',
            }))
            acum = 1;
        }
        if (dataForm.password !== '' && dataForm.password.length < 6) {
            setDataForm(prev => ({
                ...prev,
                password_error: 'red',
                password_text_error: 'La contraseña debe contener al menos 6 caracteres',
            }))
            acum = 1;
        }
        if (dataForm.confirm_password === '') {
            setDataForm(prev => ({
                ...prev,
                confirm_password_error: 'red',
                confirm_password_text_error: 'La confirmacion de la contraseña es requerida',
            }))
            acum = 1;
        }
        if (dataForm.confirm_password !== '' && dataForm.confirm_password.length < 6) {
            setDataForm(prev => ({
                ...prev,
                confirm_password_error: 'red',
                confirm_password_text_error: 'La confirmacion de la contraseña debe contener al menos 6 caracteres',
            }))
            acum = 1;
        }
        if (dataForm.password !== '' && dataForm.confirm_password !== '' && dataForm.password !== dataForm.confirm_password) {
            setDataForm(prev => ({
                ...prev,
                confirm_password_error: 'red',
                confirm_password_text_error: 'Las contraseñas deben coincidir',
            }))
            acum = 1;
        }

        if (acum > 0) {
            return false;
        }
        return true;
    };

    const saveUserAction = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            let dataSend = {
                names: dataForm.name,
                surnames: dataForm.surname,
                email: dataForm.email,
                code_phone: dataForm.code_phone,
                phone: dataForm.phone,
                type_person: dataForm.type_person,
                referred: dataForm.referred,
                business: dataForm.business,
                password: dataForm.password,
            }
            setDataForm(prev => ({
                ...prev,
                loading: true
            }))
            props.registerFireBaseUser(dataSend)
                .then(() => {
                    props.verifyuser()
                        .then(() => {
                            flashMessageAction('Usuario registrado exitosamente, revise la bandeja de entrada de su correo para la verificación', 'success');
                            props.navigation.goBack();
                        })
                        .catch(() => {
                            flashMessageAction('Error enviando el email de verificación', 'warning');
                            setDataForm(prev => ({ ...prev, loading: false }))
                        })
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        flashMessageAction('Este email ya se encuentra registrado', 'warning');
                    } else {
                        flashMessageAction('Error registrando el usuario', 'warning');
                    }
                    setDataForm(prev => ({ ...prev, loading: false }))
                })
        }
    }

    return (
        !dataForm.loading ?
            <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-250}>
                    <View style={styles.texInput}>
                        <Input
                            placeholder='Nombres'
                            onChangeText={e => { handleChange(e, 'name', 'name_error', 'name_text_error') }}
                            value={dataForm.name}
                            keyboardType='default'
                            autoCapitalize="none"
                            inputContainerStyle={{ borderColor: dataForm.name_error }}
                            errorMessage={dataForm.name_text_error}
                        />
                        <Input
                            placeholder='Apellidos'
                            onChangeText={e => { handleChange(e, 'surname', 'surname_error', 'surname_text_error') }}
                            value={dataForm.surname}
                            keyboardType='default'
                            autoCapitalize="none"
                            inputContainerStyle={{ borderColor: dataForm.surname_error }}
                            errorMessage={dataForm.surname_text_error}
                        />
                        <Input
                            placeholder='Email'
                            onChangeText={e => { handleChange(e, 'email', 'email_error', 'email_text_error') }}
                            value={dataForm.email}
                            keyboardType='email-address'
                            autoCapitalize="none"
                            inputContainerStyle={{ borderColor: dataForm.email_error }}
                            errorMessage={dataForm.email_text_error}
                        />
                    </View>
                    <View style={styles.inputPicker}>
                        <View style={styles.viewPicker}>
                            <Picker
                                selectedValue={dataForm.code_phone}
                                onValueChange={(itemValue, itemIndex) => setDataForm(prev => ({ ...prev, code_phone: itemValue }))}
                            >
                                <Picker.Item label="+51" value="+51" />
                            </Picker>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                placeholder='Teléfono'
                                onChangeText={e => { handleChange(e, 'phone', 'phone_error', 'phone_text_error') }}
                                value={dataForm.phone}
                                keyboardType='numeric'
                                autoCapitalize="none"
                                inputContainerStyle={{ borderColor: dataForm.phone_error }}
                                errorMessage={dataForm.phone_text_error}
                            />
                        </View>
                    </View>
                    <View style={
                        {
                            ...styles.viewPickerTypePerson,
                            borderBottomColor: dataForm.type_person_error,
                            marginBottom: dataForm.type_person_error === 'red' ? 25 : 20
                        }
                    }>
                        <Picker
                            selectedValue={dataForm.type_person}
                            onValueChange={(itemValue, itemIndex) =>
                                setDataForm(prev => ({
                                    ...prev,
                                    type_person: itemValue,
                                    type_person_error: 'black',
                                    type_person_text_error: ''
                                }))
                            }
                        >
                            <Picker.Item style={{ color: 'gray' }} label="Tipo de persona" value="" enabled={false} />
                            <Picker.Item label="Natural" value="natural" />
                            <Picker.Item label="Juridica" value="juridica" />
                        </Picker>
                        <View style={{ marginTop: -7, marginBottom: 5 }}>
                            <Text style={{ color: 'red', fontSize: 12 }}>{dataForm.type_person_text_error}</Text>
                        </View>
                    </View>
                    <View style={
                        {
                            ...styles.viewPickerTypePerson,
                            borderBottomColor: dataForm.referred_error,
                            marginBottom: dataForm.referred_error === 'red' ? 25 : 20
                        }
                    }>
                        <Picker
                            selectedValue={dataForm.referred}
                            onValueChange={(itemValue, itemIndex) =>
                                setDataForm(prev => ({
                                    ...prev,
                                    referred: itemValue,
                                    referred_error: 'black',
                                    referred_text_error: '',
                                    business: itemValue === 'no' ? '' : dataForm.business,
                                    business_error: itemValue === 'no' ? 'black' : dataForm.business_error,
                                    business_text_error: itemValue === 'no' ? '' : dataForm.business_text_error,
                                }))
                            }
                        >
                            <Picker.Item style={{ color: 'gray' }} label="Referido" value="" enabled={false} />
                            <Picker.Item label="Si" value="si" />
                            <Picker.Item label="No" value="no" />
                        </Picker>
                        <View style={{ marginTop: -7, marginBottom: 5 }}>
                            <Text style={{ color: 'red', fontSize: 12 }}>{dataForm.referred_text_error}</Text>
                        </View>
                    </View>
                    {
                        dataForm.referred === 'si' ?
                            <View style={
                                {
                                    ...styles.viewPickerTypePerson,
                                    borderBottomColor: dataForm.business_error,
                                    marginBottom: dataForm.business_error === 'red' ? 25 : 20
                                }
                            }>
                                <Picker
                                    selectedValue={dataForm.business}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDataForm(prev => ({
                                            ...prev,
                                            business: itemValue,
                                            business_error: 'black',
                                            business_text_error: ''
                                        }))
                                    }
                                >
                                    <Picker.Item style={{ color: 'gray' }} label="¿Por quien fue referido?" value="" enabled={false} />
                                    {
                                        props.businessSelect && props.businessSelect.map((data, key) => {
                                            return (
                                                <Picker.Item key={key} label={data.label} value={data.value} />
                                            )
                                        })
                                    }
                                </Picker>
                                <View style={{ marginTop: -7, marginBottom: 5 }}>
                                    <Text style={{ color: 'red', fontSize: 12 }}>{dataForm.business_text_error}</Text>
                                </View>
                            </View>
                            :
                            null
                    }
                    <View style={styles.texInput}>
                        <Input
                            placeholder="Contraseña"
                            onChangeText={e => { handleChange(e, 'password', 'password_error', 'password_text_error') }}
                            value={dataForm.password}
                            keyboardType='default'
                            autoCapitalize="none"
                            secureTextEntry={dataForm.showHidePassword}
                            inputContainerStyle={{ borderColor: dataForm.password_error }}
                            errorMessage={dataForm.password_text_error}
                            rightIcon={
                                <AntDesign
                                    name="eye"
                                    size={24}
                                    color="black"
                                    onPress={() => setDataForm(prev => ({ ...prev, showHidePassword: !dataForm.showHidePassword }))}
                                />
                            }
                        />
                        <Input
                            placeholder='Confirmar contraseña'
                            onChangeText={e => { handleChange(e, 'confirm_password', 'confirm_password_error', 'confirm_password_text_error') }}
                            value={dataForm.confirm_password}
                            keyboardType='default'
                            autoCapitalize="none"
                            secureTextEntry={dataForm.showHidePasswordConfirm}
                            inputContainerStyle={{ borderColor: dataForm.confirm_password_error }}
                            errorMessage={dataForm.confirm_password_text_error}
                            rightIcon={
                                <AntDesign
                                    name="eye"
                                    size={24}
                                    color="black"
                                    onPress={() => setDataForm(prev => ({ ...prev, showHidePasswordConfirm: !dataForm.showHidePasswordConfirm }))}
                                />
                            }
                        />
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            title='Registrarse'
                            onPress={saveUserAction}
                        />
                    </View>
                    <Text></Text>
                </KeyboardAvoidingView>

            </ScrollView>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        paddingVertical: 20
    },
    texInput: {
        //marginBottom: 6,
    },
    inputPicker: {
        flex: 1,
        flexDirection: 'row'
    },
    viewPicker: {
        height: 41,
        width: 100,
        borderBottomWidth: 0.8,
        alignContent: 'center',
        marginHorizontal: 10,
    },
    viewPickerTypePerson: {
        height: 41,
        borderBottomWidth: 0.8,
        alignContent: 'center',
        marginHorizontal: 10,
        marginBottom: 15
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

export default RegisterForm;