import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, ActivityIndicator, Text } from 'react-native';
import { updateRates } from '../../../Actions/RatesActions'
import { Input } from '@rneui/themed';
import { formatMonto } from '../../../Helpers/Herlpers'
import { connect } from 'react-redux';
import { flashMessageAction, amountConvert, completDecimal } from '../../../Helpers/Herlpers'

function Rate(props) {
    const { navigation, route } = props;
    const [state, setState] = useState({
        loading: false,
        sol: '',
        solError: '',
        solTextError: '',
        dolar: '',
        dolarError: '',
        dolarTextError: '',
    })

    useEffect(() => {
        if (props.rates) {
            setState(prev => ({
                ...prev,
                sol: amountConvert(completDecimal(props.rates.sol)),
                dolar: amountConvert(completDecimal(props.rates.dolar)),
            }))
        }
    }, [props.rates])

    const validate = () => {
        let acum = "";
        if (state.sol === '' || formatMonto(state.sol) === 0) {
            setState(prev => ({
                ...prev,
                solError: 'red',
                solTextError: 'Ingrese la tasa para soles',
            }))
            acum = 1;
        }
        if (state.dolar === '' || formatMonto(state.dolar) === 0) {
            setState(prev => ({
                ...prev,
                dolarError: 'red',
                dolarTextError: 'Ingrese la tasa para dolares',
            }))
            acum = 1;
        }

        if (acum > 0) {
            return false;
        }
        return true;
    }

    const updatesRates = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            setState(prev => ({
                ...prev,
                loading: true
            }))
            updateRates({ dolar: formatMonto(state.dolar), sol: formatMonto(state.sol) })
                .then(() => {
                    flashMessageAction('Tasas actualizadas con éxito', 'success');
                    navigation.navigate('Home')
                })
                .catch(() => {
                    flashMessageAction('Error actualizando las tasas', 'warning');
                    setState(prev => ({
                        ...prev,
                        loading: false
                    }))
                })
        }
    }

    const handleChange = (value, input, error, textError) => {
        setState(prev => ({
            ...prev,
            [input]: amountConvert(value),
            [error]: 'black',
            [textError]: ''
        }))
    }

    return (
        !state.loading ?
            <View style={styles.container}>
                <View style={{marginHorizontal:10}}>
                    <Text>Soles</Text>
                </View>
                <Input
                    placeholder='Sol'
                    onChangeText={(e) => handleChange(e, 'sol', 'solError', 'solTextError')}
                    value={state.sol}
                    name='sol'
                    keyboardType='numeric'
                    autoCapitalize="none"
                    inputContainerStyle={{ borderColor: state.solError }}
                    errorMessage={state.solTextError}
                />
                <View style={{marginHorizontal:10}}>
                    <Text>Dolares</Text>
                </View>
                <Input
                    placeholder='Dolar'
                    onChangeText={(e) => handleChange(e, 'dolar', 'dolarError', 'dolarTextError')}
                    value={state.dolar}
                    name='dolar'
                    keyboardType='numeric'
                    autoCapitalize="none"
                    inputContainerStyle={{ borderColor: state.dolarError }}
                    errorMessage={state.dolarTextError}
                />
                <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                    <Button
                        title='Actualizar'
                        onPress={updatesRates}
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
        justifyContent: 'center',
        paddingVertical: 20,

        backgroundColor: '#fff',
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    rates: state.rates.rates,
});

export default connect(mapStateToProps, null)(Rate);