import * as React from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { loginAction } from '../../../Actions/UsersActions';
import LoginForm from './LoginForm';

function Login(props) {
    const { navigation, screenProps } = props;
    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-100}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.image}>
                            <Image
                                source={require('../../../assets/tepuy.png')}
                                style={{ width: 200, height: 200, borderRadius: 10 }}
                            />
                        </View>
                        <View style={styles.containerForm}>
                            <LoginForm
                                loginAction={props.loginAction}
                                navigation={navigation}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    containerForm: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 30,
    },
    text: {
        fontSize: 25,
    },
    image: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
});

const mapDispatchToProps = dispatch => ({
    loginAction: (data) => dispatch(loginAction(data)),
});

export default connect(null, mapDispatchToProps)(Login);