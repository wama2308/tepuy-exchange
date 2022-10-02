import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useSendMoney } from '../../../Hooks/SendMoney'
import { setStep } from '../../../Actions/DirectoryActions'
import { connect } from 'react-redux';
import {
    convertCapitalize,
    amountConvert,
    completDecimal,
    symbolCurrency,
    dosDecimales,
    saveLocalStorageSendMoney
} from '../../../Helpers/Herlpers'

function StepOne(props) {
    const { state, setState } = useSendMoney();
    //console.log("StepOne ", props.rates)

    useEffect(() => {
        console.log("StepOne")
    }, [])

    const handleChange = (value, input, error, textError) => {
        setState(prev => ({
            ...prev,
            [input]: amountConvert(value),
            amountReceived: value ? calculateAmountReceived(value, props.rates[state.typeCurrency]) : '',
            [error]: 'black',
            [textError]: ''
        }))
    }

    const calculateAmountReceived = (send, rate) => {
        let amount = parseFloat(amountConvert(send).replace(/\./g, "").replace(/\,/g, "."))
        let rateFloat = parseFloat(rate)
        let total = dosDecimales(rateFloat * amount)
        return amountConvert(completDecimal(total))
    }

    const validate = () => {
        let acum = "";
        if (state.typeCurrency === '') {
            setState(prev => ({
                ...prev,
                errorTypeCurrency: 'red',
                textErrorTypeCurrency: 'Seleccione la moneda',
            }))
            acum = 1;
        }
        if (state.amountSend === '' || parseFloat(state.amountSend) === 0) {
            setState(prev => ({
                ...prev,
                errorAmountSend: 'red',
                textErrorAmountSend: 'Ingrese el monto a enviar',
            }))
            acum = 1;
        }

        if (acum > 0) {
            return false;
        }
        return true;
    }

    const stepTwo = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            console.log("paso ya al dos")
            saveLocalStorageSendMoney({
                steps: {
                    step: 0,
                    typeCurrency: state.typeCurrency,
                    amountSend: state.amountSend,
                    amountReceived: state.amountReceived,
                }
            }).then(() => {
                // setState(prev => ({
                //     ...prev,
                //     currentPosition: 1
                // }))
                props.setStep(1)
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ ...styles.viewPickerTypeCurrency, borderBottomColor: state.errorTypeCurrency }}>
                <Picker
                    selectedValue={state.typeCurrency}
                    onValueChange={(itemValue) => {
                        setState(prev => ({
                            ...prev,
                            typeCurrency: itemValue,
                            amountReceived: state.amountSend ?
                                calculateAmountReceived(state.amountSend, props.rates[itemValue]) :
                                state.amountReceived,
                            errorTypeCurrency: 'black',
                            textErrorTypeCurrency: ''
                        }))
                    }}
                    style={{ marginLeft: -7, }}
                >
                    <Picker.Item
                        style={{ color: 'gray', fontSize: 18 }}
                        label="Moneda"
                        value=""
                        enabled={false}
                    />
                    {
                        Object.keys(props.rates).map((key, index) => {
                            if (["dolar", "sol"].includes(key)) {
                                return (
                                    <Picker.Item
                                        style={{ color: '#000', fontSize: 18 }}
                                        label={convertCapitalize(key)}
                                        value={key}
                                        key={index}
                                    />
                                )
                            }
                        })
                    }
                </Picker>
                <View style={{ marginTop: -7, marginHorizontal: 0 }}>
                    <Text style={{ color: 'red', fontSize: 12 }}>{state.textErrorTypeCurrency}</Text>
                </View>
            </View>
            <View>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, color: 'gray' }}>Monto a enviar</Text>
                </View>
                <Input
                    placeholder='0,00'
                    onChangeText={(e) => handleChange(e, 'amountSend', 'errorAmountSend', 'textErrorAmountSend')}
                    value={state.amountSend}
                    name='amountSend'
                    keyboardType='numeric'
                    autoCapitalize="none"
                    disabled={state.typeCurrency === '' ? true : false}
                    inputContainerStyle={{ borderColor: state.errorAmountSend }}
                    errorMessage={state.textErrorAmountSend}
                />
                {
                    (state.typeCurrency && state.amountSend && parseFloat(state.amountSend) > 0) ?
                        <View style={styles.viewTextChange}>
                            <Text style={{ fontWeight: '400' }}>
                                {amountConvert(completDecimal(props.rates[state.typeCurrency]))} X 1{symbolCurrency(state.typeCurrency)}
                            </Text>
                        </View>
                        : null
                }
            </View>
            <View>
                <View style={{ marginHorizontal: 10 }}>
                    <Text style={{ fontSize: 18, color: 'gray' }}>Monto a recibir</Text>
                </View>
                <Input
                    placeholder='0,00'
                    // onChangeText={(e) => handleChange(e, 'sol', 'solError', 'solTextError')}
                    value={state.amountReceived}
                    name='amountReceived'
                    keyboardType='default'
                    autoCapitalize="none"
                    disabled={true}
                />
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <Button
                    title='Siguiente'
                    // disabled={state.typeCurrency !== '' && state.amountSend !== '' ? false : true}
                    onPress={stepTwo}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
    },
    viewPickerTypeCurrency: {
        height: 45,
        borderBottomWidth: 0.8,
        borderBottomColor: 'gray',
        alignContent: 'center',
        marginHorizontal: 10,
        marginBottom: 25,
        marginTop: 10
    },
    viewTextChange: {
        marginHorizontal: 10,
        marginTop: -20,
        marginBottom: 10
    }
});

const mapStateToProps = state => ({
    rates: state.rates.rates,
});

const mapDispatchToProps = dispatch => ({
    setStep: (data) => dispatch(setStep(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);