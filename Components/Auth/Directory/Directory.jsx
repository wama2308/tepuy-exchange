import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';


function Directory(props) {
    const { navigation, route } = props;
    useEffect(() => {
        console.log("Directory")
    }, [])
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    return (

        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Buscar"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <View style={{ flex: 10 }}>
                <ScrollView>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wama</Text>
                    <Text style={{ color: 'red', fontSize: 100 }}>wamaR</Text>
                </ScrollView>
            </View>
            <TouchableHighlight onPress={() => navigation.navigate("AddBeneficiario")}>
                <View style={styles.buttonFloat} >
                    <Text style={{ color: '#fff', fontSize: 25 }}>+</Text>
                </View>
            </TouchableHighlight>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginHorizontal: 10,
        marginVertical: 20,
    },
    buttonFloat: {
        flex: 1,
        borderRadius: 50,
        backgroundColor: '#007bff',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
});

export default Directory;