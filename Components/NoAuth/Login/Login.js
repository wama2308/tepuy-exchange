import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginForm from './LoginForm';

export default function Login(props) {    
    const { navigation, screenProps } = props;
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image
                        source={require('../../../assets/tepuy.png')}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                </View>
                <View style={styles.containerForm}>
                    <LoginForm navigation={navigation} />
                </View>
            </View>
        </View>
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