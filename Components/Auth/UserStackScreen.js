import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import User from './Account';
import ChangePassword from './Account/ChangePassword';
import UpdateDataBasic from './Account/UpdateDataBasic';
import MenuRight from '../MenuRight';
import { connect } from 'react-redux';

const UserStack = createNativeStackNavigator();

function UserStackScreen(props) {
    const [typeUser, setTypeUser] = useState(null)

    useEffect(() => {
        //searchTypeUser().then((res) => setTypeUser(res))
    }, [])

    const { navigation, route } = props;
    const { params } = route
    // console.log("UserStackScreen ", props)
    return (
        !props.users ?
          <View style={styles.viewLoading}>
            <ActivityIndicator size={80} color='#174ea6' />
          </View>
          :
        <UserStack.Navigator>
            <UserStack.Screen
                name="Cuenta"
                component={User}
                options={{
                    headerRight: () => (
                        <MenuRight
                            navigation={navigation}
                            option='account'
                            logoutAction={params.logoutAction}
                        />
                    ),
                }}
            />
            <UserStack.Screen name="updateData" component={UpdateDataBasic} options={{ title: 'Actualizar datos' }} />
            <UserStack.Screen name="changePassword" component={ChangePassword} options={{ title: 'Cambiar contraseña' }} />
        </UserStack.Navigator>
    );
}

const styles = StyleSheet.create({
    viewLoading: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = state => ({
    users: state.users.infoUser,
});

export default connect(mapStateToProps, null)(UserStackScreen);