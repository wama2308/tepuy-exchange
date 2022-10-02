import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Input } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import FormAddDirectory from './FormAddDirectory';
import { useSendMoney } from '../../../Hooks/SendMoney'
import { connect } from 'react-redux';

function StepTwo(props) {    
    const { navigation } = props;
    useEffect(() => {
        //console.log("StepTwo ", props)

    }, [])

    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
                <Button
                    title='Directorio'
                    onPress={() => { props.navigation.navigate('Directorio') }}
                />
            </View>
            <FormAddDirectory banks={props.banks} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10
    },
});

const mapStateToProps = state => ({
    banks: state.banks.banks
});

export default connect(mapStateToProps, null)(StepTwo);