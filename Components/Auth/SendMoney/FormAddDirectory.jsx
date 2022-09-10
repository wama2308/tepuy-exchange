import React from 'react';
import { View, StyleSheet, Button, Text, ActivityIndicator } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useSendMoney } from '../../../Hooks/SendMoney'
import { registerFireBaseDirectory } from '../../../Actions/DirectoryActions'
import { flashMessageAction } from '../../../Helpers/Herlpers'

function FormAddDirectory(props) {
    const { state, setState } = useSendMoney();

    const validate = () => {
        let acum = "";
        if (state.bank === '') {
            setState(prev => ({
                ...prev,
                errorBank: 'red',
                textErrorBank: 'Seleccione el banco',
            }))
            acum = 1;
        }
        if (state.accountNumber === '') {
            setState(prev => ({
                ...prev,
                errorAccountNumber: 'red',
                textErrorAccountNumber: 'Ingrese el número de cuenta',
            }))
            acum = 1;
        }
        if (state.headline === '') {
            setState(prev => ({
                ...prev,
                errorHeadLine: 'red',
                textErrorHeadLine: 'Ingrese el titular',
            }))
            acum = 1;
        }
        if (state.dni === '') {
            setState(prev => ({
                ...prev,
                errorDni: 'red',
                textErrorDni: 'Ingrese la cédula',
            }))
            acum = 1;
        }
        if (state.phone === '') {
            setState(prev => ({
                ...prev,
                errorPhone: 'red',
                textErrorPhone: 'Ingrese el télefono',
            }))
            acum = 1;
        }
        if (acum > 0) {
            return false;
        }
        return true;
    }

    const saveDirectoryAction = e => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            registerFireBaseDirectory({
                accountNumber: state.accountNumber,
                headline: state.headline,
                codeDni: state.codeDni,
                dni: state.dni,
                codePhone: state.codePhone,
                phone: state.phone,
            })
                .then(() => {
                    flashMessageAction('Beneficiario registrado con éxito', 'success');
                    setState(prev => ({
                        ...prev,
                        loading: false,
                        bank: '',
                        accountNumber: '',
                        headline: '',
                        codeDni: 'V',
                        dni: '',
                        codePhone: '0412',
                        phone: ''
                    }))
                    props.navigation.goBack()
                })
                .catch(() => {
                    flashMessageAction('Error registrando el beneficiario', 'warning');
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                })
        }
    }
    console.log("aqui ", state)
    return (
        !state.loading ?
            <View>
                <View style={{
                    ...styles.viewPicker,
                    borderBottomColor: state.errorBank,
                }}
                >
                    <Picker
                        selectedValue={state.bank}
                        onValueChange={(itemValue) => {
                            setState(prev => ({
                                ...prev,
                                bank: itemValue,
                                errorBank: 'black',
                                textErrorBank: ''
                            }))
                        }}
                    >
                        <Picker.Item style={{ color: '#839192', fontSize: 19 }} label="Banco" value="" enabled={false} />
                        {
                            Object.keys(props.banks).map((bank, key) => {
                                return (
                                    <Picker.Item
                                        style={{ color: 'black', fontSize: 18 }}
                                        label={props.banks[bank].label}
                                        value={bank}
                                        key={key}
                                    />
                                )
                            })
                        }
                    </Picker>
                </View>
                <View style={{ marginTop: -15, marginHorizontal: 10 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{state.textErrorBank}</Text>
                </View>
                <View style={{}}>
                    <Input
                        placeholder='Número de cuenta'
                        onChangeText={e => {
                            setState(
                                {
                                    ...state,
                                    accountNumber: e,
                                    errorAccountNumber: 'black',
                                    textErrorAccountNumber: ''
                                })
                        }}
                        value={state.accountNumber}
                        keyboardType='numeric'
                        autoCapitalize="none"
                        maxLength={20}
                        inputContainerStyle={{ borderColor: state.errorAccountNumber }}
                        errorMessage={state.textErrorAccountNumber}
                    />
                </View>
                <View style={{}}>
                    <Input
                        placeholder='Nombre y apellido'
                        onChangeText={e => {
                            setState(
                                {
                                    ...state,
                                    headline: e,
                                    errorHeadLine: 'black',
                                    textErrorHeadLine: ''
                                })
                        }}
                        value={state.headline}
                        keyboardType='default'
                        autoCapitalize="none"
                        inputContainerStyle={{ borderColor: state.errorHeadLine }}
                        errorMessage={state.textErrorHeadLine}
                    />
                </View>
                <View style={{ marginTop: -5 }}>
                    <View style={styles.inputPicker}>
                        <View style={{ ...styles.viewPicker, width: '30%', paddingBottom: 10 }}>
                            <Picker
                                selectedValue={state.codeDni}
                                onValueChange={(itemValue, itemIndex) => setState(prev => ({
                                    ...prev,
                                    codeDni: itemValue
                                }))}
                            >
                                <Picker.Item label="V" value="V" />
                                <Picker.Item label="E" value="E" />
                                <Picker.Item label="P" value="P" />
                                <Picker.Item label="J" value="J" />
                                <Picker.Item label="G" value="G" />
                            </Picker>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                placeholder='Cédula'
                                onChangeText={e => {
                                    setState({
                                        ...state,
                                        dni: e,
                                        errorDni: 'black',
                                        textErrorDni: ''
                                    })
                                }}
                                value={state.dni}
                                keyboardType='numeric'
                                autoCapitalize="none"
                                maxLength={8}
                                inputContainerStyle={{ borderColor: state.errorDni }}
                                errorMessage={state.textErrorDni}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.inputPicker}>
                    <View style={{ ...styles.viewPicker, width: '30%', paddingBottom: 10 }}>
                        <Picker
                            selectedValue={state.codePhone}
                            onValueChange={(itemValue, itemIndex) => setState(prev => (
                                {
                                    ...prev,
                                    codePhone: itemValue
                                }))}
                        >
                            <Picker.Item label="0412" value="0412" />
                            <Picker.Item label="0424" value="0424" />
                            <Picker.Item label="0414" value="0414" />
                            <Picker.Item label="0426" value="0426" />
                            <Picker.Item label="0416" value="0416" />
                        </Picker>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input
                            placeholder='Teléfono'
                            onChangeText={e => {
                                setState({
                                    ...state, phone: e,
                                    errorPhone: 'black',
                                    textErrorPhone: ''
                                })
                            }}
                            value={state.phone}
                            keyboardType='numeric'
                            autoCapitalize="none"
                            maxLength={7}
                            inputContainerStyle={{ borderColor: state.errorPhone }}
                            errorMessage={state.textErrorPhone}
                        />
                    </View>
                </View>
                <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                    <Button
                        title='Guardar'
                        // disabled={state.typeCurrency !== '' && state.amountSend !== '' ? false : true}
                        onPress={saveDirectoryAction}
                    />
                </View>
            </View>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    )
}

const styles = StyleSheet.create({
    inputPicker: {
        flex: 1,
        flexDirection: 'row',

    },
    viewPicker: {
        height: 41,
        width: '94%',
        borderBottomWidth: 0.8,
        alignContent: 'center',
        marginHorizontal: 10,
        paddingBottom: 45,
        marginBottom: 20,
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        marginVertical: 150
    }
});


export default FormAddDirectory;