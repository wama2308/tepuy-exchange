import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterForm from './RegisterForm';
import { registerFireBaseUser } from '../../../Actions/UsersActions';

export default function Register(props) {
  const { navigation, screenProps } = props;
  return (
    <View style={styles.container}>
      <RegisterForm navigation={navigation} registerFireBaseUser={registerFireBaseUser} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
});