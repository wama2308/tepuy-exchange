import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Button } from 'react-native';
import { Card } from 'react-native-paper';
import FormAddDirectory from './FormAddDirectory';
import { connect } from 'react-redux';

function AddDirectory(props) {
    const { navigation } = props;
    useEffect(() => {

    }, [])

    return (
        props.banks ?
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Card style={{ paddingVertical: 10 }}>
                        <FormAddDirectory banks={props.banks} navigation={navigation} />
                    </Card>
                </ScrollView>
            </SafeAreaView>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 20,
    },
});

const mapStateToProps = state => ({
    banks: state.banks.banks
});

export default connect(mapStateToProps, null)(AddDirectory);