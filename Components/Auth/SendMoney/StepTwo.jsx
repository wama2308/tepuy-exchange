import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useSendMoney } from '../../../Hooks/SendMoney'

function StepTwo() {
    const { state } = useSendMoney();
    
    return (
        <View>
            <Text>DOS</Text>
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

export default StepTwo;