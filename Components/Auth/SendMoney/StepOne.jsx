import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Button } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useSendMoney } from '../../../Hooks/SendMoney'
import { connect } from 'react-redux';
import {
    convertCapitalize,
    amountConvert,
    completDecimal,
    symbolCurrency,
    dosDecimales,
    saveLocalStorageSendMoney
}
    from '../../../Helpers/Herlpers'

function StepOne(props) {
    const { state, setState } = useSendMoney();
    //console.log("StepOne ", props.rates)

    useEffect(() => {
        console.log("StepOne")
    }, [])

    const handleChange = (value, input) => {
        setState(prev => ({
            ...prev,
            [input]: amountConvert(value),
            amountReceived: value ? calculateAmountReceived(value, props.rates[state.typeCurrency]) : ''
        }))
    }

    const calculateAmountReceived = (send, rate) => {
        let amount = parseFloat(amountConvert(send).replace(/\./g, "").replace(/\,/g, "."))
        let rateFloat = parseFloat(rate)
        let total = dosDecimales(rateFloat * amount)
        return amountConvert(completDecimal(total))
    }

    const stepTwo = () => {
        console.log("paso")
        saveLocalStorageSendMoney({
            steps: {
                step: 0,
                typeCurrency: state.typeCurrency,
                amountSend: state.amountSend,
                amountReceived: state.amountReceived,
            }
        }).then(() => {
            setState(prev => ({
                ...prev,
                currentPosition: 1
            }))
        })
    }

    return (
        props.rates ?
            <View style={styles.container}>
                <View style={styles.viewPickerTypeCurrency}>
                    <Picker
                        selectedValue={state.typeCurrency}
                        onValueChange={(itemValue) => {
                            setState(prev => ({
                                ...prev,
                                typeCurrency: itemValue,
                                amountReceived: state.amountSend ?
                                    calculateAmountReceived(state.amountSend, props.rates[itemValue]) :
                                    state.amountReceived
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
                                            style={{ color: '#839192', fontSize: 18 }}
                                            label={convertCapitalize(key)}
                                            value={key}
                                            key={index}
                                        />
                                    )
                                }
                            })
                        }
                    </Picker>
                </View>
                <View>
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, color: 'gray' }}>Monto a enviar</Text>
                    </View>
                    <Input
                        placeholder='0,00'
                        onChangeText={(e) => handleChange(e, 'amountSend')}
                        value={state.amountSend}
                        name='amountSend'
                        keyboardType='numeric'
                        autoCapitalize="none"
                        disabled={state.typeCurrency === '' ? true : false}
                    />
                    {
                        state.typeCurrency ?
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
                        disabled={state.typeCurrency !== '' && state.amountSend !== '' ? false : true}
                        onPress={stepTwo}
                    />
                </View>
            </View>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
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
    viewPickerTypeCurrency: {
        height: 45,
        borderBottomWidth: 0.8,
        borderBottomColor: 'gray',
        alignContent: 'center',
        marginHorizontal: 10,
        marginBottom: 25,
        marginTop: 10
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: 20
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

export default connect(mapStateToProps, null)(StepOne);