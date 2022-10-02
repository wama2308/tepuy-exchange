import React, { useState, useEffect } from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSendMoney } from '../../../Hooks/SendMoney'

function CardList(props) {
    const { navigation, route, item } = props;
    const { state, setState } = useSendMoney();
    useEffect(() => {
        // console.log("Directory")
        //loadDirectory()
    }, [])

    const deleteRegister = (id) => {
        Alert.alert("Elimnar registro",
            "¿Seguro desea eliminar el beneficiario?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        props.setLoading(true),
                            props.deleteDirectory(id)
                                .then(() => props.setLoading(false))
                                .catch(() => props.setLoading(false))
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const loadHeadline = (item) => {
        setState({
            ...state,
            bank: item.bank,
            accountNumber: item.accountNumber,
            headline: item.headline,
            codeDni: item.codeDni,
            dni: item.dni,
            codePhone: item.codePhone,
            phone: item.phone,

        })
        navigation.goBack()
    }

    return (
        <TouchableOpacity onPress={() => loadHeadline(item)}>
            <View style={styles.container}>
                <View style={styles.divName}>
                    <View>
                        <Text style={{ fontSize: 20 }}>{item.headline}</Text>
                    </View>
                    <View >
                        <SimpleLineIcons
                            onPress={() => deleteRegister(item.id)}
                            name="trash"
                            size={22}
                            color="black"
                            style={{ paddingHorizontal: 0 }}
                        />
                    </View>
                </View>
                <View style={styles.divider}></View>
                <View style={{ padding: 15 }}>
                    <Text><Text style={styles.textOther}>Banco:</Text> {props.banks[props.item.bank].label}</Text>
                    <Text><Text style={styles.textOther}>Teléfono:</Text> {`${item.codePhone}-${item.phone}`}</Text>
                    <Text><Text style={styles.textOther}>Cédula:</Text> {`${item.codeDni}-${item.dni}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 5
    },
    divName: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "gray",
        marginVertical: 0,
    },
    textOther: {
        fontWeight: 'bold',
        fontSize: 15
    }

});

export default CardList;