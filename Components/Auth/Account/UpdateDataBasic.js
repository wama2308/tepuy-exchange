import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Input } from '@rneui/themed';
import { stateInitial } from '../../../Components/NoAuth/Register/StateInitial'
import { flashMessageAction } from '../../../Helpers/Herlpers'
import { connect } from 'react-redux';
import { updateUserDataBasic } from '../../../Actions/UsersActions'

function UpdateDataBasic(props) {
    const { navigation } = props;
    const initialFormState = stateInitial;
    const [dataForm, setDataForm] = useState(initialFormState)

    useEffect(() => {
        if (props.users) {
            setDataForm(prev => ({
                ...prev,
                name: props.users.names,
                surname: props.users.surnames,
                code_phone: props.users.code_phone,
                phone: props.users.phone,
                type_person: props.users.type_user,
                loading: false
            }))
        }
    }, [])

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
        if (dataForm.phone === '') {
            setDataForm(prev => ({
                ...prev,
                phone_error: 'red',
                phone_text_error: 'El telefono es requerido',
            }))
            acum = 1;
        }
        if (dataForm.type_person === '' && props.users.type_user !== 'admin') {
            setDataForm(prev => ({
                ...prev,
                type_person_error: 'red',
                type_person_text_error: 'Debe seleccionar el tipo de persona',
            }))
            acum = 1;
        }
        if (acum > 0) {
            return false;
        }
        return true;
    };

    const updateBasicUserAction = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            let dataSend = {
                names: dataForm.name,
                surnames: dataForm.surname,
                code_phone: dataForm.code_phone,
                phone: dataForm.phone,
                type_person: dataForm.type_person,
            }
            setDataForm(prev => ({
                ...prev,
                loading: true
            }))
            updateUserDataBasic(dataSend)
                .then(() => {
                    flashMessageAction('Información actualizada con éxito', 'success');
                    navigation.navigate("Cuenta");
                })
                .catch(() => {
                    flashMessageAction('Error actualizando la información', 'warning');
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
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
                    {
                        props.users.type_user !== 'admin' ?
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
                            :
                            null
                    }
                    <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                        <Button
                            title='Actualizar'
                            onPress={updateBasicUserAction}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        paddingVertical: 20,
        backgroundColor: '#ffffff'
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
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    }
});

const mapStateToProps = state => ({
    users: state.users.infoUser,
});

export default connect(mapStateToProps, null)(UpdateDataBasic);