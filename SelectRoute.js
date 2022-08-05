import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import RoutesNoAuth from "./Components/NoAuth/RoutesNoAuth";
import RouteAuth from "./Components/Auth/RouteAuth";
import { authentication, logoutAction } from "./Actions/UsersActions";
import { connect } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';

const SelectRoute = (props) => {
    useEffect(() => {
        props.authentication();
    }, [])

    return (
        <>
            <NavigationContainer>
                {
                    props.users === null && (
                        <View style={styles.viewLoading}>
                            <ActivityIndicator size={80} color='#007bff' />
                        </View>
                    )
                }
                {
                    props.users && props.users.uid !== '' && (
                        <RouteAuth
                            logoutAction={props.logoutAction}
                        />
                    )
                }
                {
                    props.users && props.users.uid === '' && (
                        <RoutesNoAuth />
                    )
                }

            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    users: state.users.userState,
});

const mapDispatchToProps = dispatch => ({
    authentication: () => dispatch(authentication()),
    logoutAction: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectRoute);