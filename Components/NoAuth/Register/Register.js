import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import RegisterForm from './RegisterForm';
import { registerFireBaseUser, verifyuser, searchUsersBusiness } from '../../../Actions/UsersActions';

export default function Register(props) {
  const { navigation, screenProps } = props;
  const [businessSelect, setBusinessSelect] = useState(null)
  useEffect(() => {
    searchUsersBusiness()
      .then((res) => {        
        setBusinessSelect(res)
      });
  }, [])
  return (
    <View style={styles.container}>
      <RegisterForm
        navigation={navigation}
        registerFireBaseUser={registerFireBaseUser}
        verifyuser={verifyuser}
        businessSelect={businessSelect}
      />
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