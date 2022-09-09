import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useSendMoney } from '../../../Hooks/SendMoney'

function FormAddDirectory(props) {
    const { state, setState } = useSendMoney();
    return (
        <View>
            <View style={styles.viewPicker}>
                <Picker
                    selectedValue={state.bank}
                    onValueChange={(itemValue) => {
                        setState(prev => ({
                            ...prev,
                            bank: itemValue,
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
            <View style={{}}>
                <Input
                    placeholder='Número de cuenta'
                    onChangeText={e => { setState({ ...state, accountNumber: e }) }}
                    value={state.accountNumber}
                    keyboardType='numeric'
                    autoCapitalize="none"
                    maxLength={20}
                />
            </View>
            <View style={{}}>
                <Input
                    placeholder='Nombre y apellido'
                    onChangeText={e => { setState({ ...state, headline: e }) }}
                    value={state.headline}
                    keyboardType='default'
                    autoCapitalize="none"
                />
            </View>
            <View style={{ marginTop: -5 }}>
                <View style={styles.inputPicker}>
                    <View style={{ ...styles.viewPicker, width: '30%', paddingBottom: 10 }}>
                        <Picker
                            selectedValue={state.codeDni}
                            onValueChange={(itemValue, itemIndex) => setState(prev => ({ ...prev, codeDni: itemValue }))}
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
                            onChangeText={e => { setState({ ...state, dni: e }) }}
                            value={state.dni}
                            keyboardType='numeric'
                            autoCapitalize="none"
                            maxLength={8}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.inputPicker}>
                <View style={{ ...styles.viewPicker, width: '30%', paddingBottom: 10 }}>
                    <Picker
                        selectedValue={state.codePhone}
                        onValueChange={(itemValue, itemIndex) => setState(prev => ({ ...prev, codePhone: itemValue }))}
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
                        onChangeText={e => { setState({ ...state, phone: e }) }}
                        value={state.phone}
                        keyboardType='numeric'
                        autoCapitalize="none"
                        maxLength={7}
                    />
                </View>
            </View>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <Button
                    title='Siguiente'
                // disabled={state.typeCurrency !== '' && state.amountSend !== '' ? false : true}
                // onPress={stepTwo}
                />
            </View>
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
        marginBottom: 20
    },        
});


export default FormAddDirectory;