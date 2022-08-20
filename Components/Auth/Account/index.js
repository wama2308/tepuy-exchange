import React, { } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { convertUnixDate } from '../../../Helpers/Herlpers';
import { connect } from 'react-redux';

function User(props) {
    //console.log("User ", props.users)

    return (
        props.users ?
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Card>
                        <Card.Title title="Información de la cuenta" />
                        <View style={styles.divider}></View>
                        <Card.Content style={{ paddingVertical: 10 }}>
                            <View style={{ paddingVertical: 5 }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    Nombres
                                </Paragraph>
                                <Paragraph style={{ fontWeight: '100' }}>
                                    {props.users.names}
                                </Paragraph>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    Apellidos
                                </Paragraph>
                                <Paragraph style={{ fontWeight: '100' }}>
                                    {props.users.surnames}
                                </Paragraph>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    Email
                                </Paragraph>
                                <Paragraph style={{ fontWeight: '100' }}>
                                    {props.users.email}
                                </Paragraph>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    Teléfono
                                </Paragraph>
                                <Paragraph style={{ fontWeight: '100' }}>
                                    {`${props.users.code_phone} ${props.users.phone}`}
                                </Paragraph>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    Tipo
                                </Paragraph>
                                <Paragraph style={{ fontWeight: '100' }}>
                                    {`${props.users.type_user.replace(/^\w/, (c) => c.toUpperCase())}`}
                                </Paragraph>
                            </View>
                            <View style={{ paddingVertical: 5 }}>
                                <Paragraph style={{ fontWeight: 'bold' }}>
                                    Fecha de registro
                                </Paragraph>
                                <Paragraph style={{ fontWeight: '100' }}>
                                    {convertUnixDate(props.users.created_at)}
                                </Paragraph>
                            </View>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </SafeAreaView>
            :
            <View style={styles.viewLoading}>
                <ActivityIndicator size={80} color='#174ea6' />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 20,
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "gray",
        marginVertical: 0
    },
});

const mapStateToProps = state => ({
    users: state.users.infoUser,
});

export default connect(mapStateToProps, null)(User);