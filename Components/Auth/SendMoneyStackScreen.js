import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendMoneyContainer from './SendMoney/SendMoneyContainer';
import Directory from './Directory/Directory';
import AddDirectory from './SendMoney/AddDirectory';
import { searchTypeUser } from '../../Actions/UsersActions'
import { SendMoneyProvider } from '../../Hooks/SendMoney';
import { connect } from 'react-redux';

const SenMoneyStack = createNativeStackNavigator();

function SendMoneyStackScreen(props) {
  const [typeUser, setTypeUser] = useState(null)

  useEffect(() => {
    props.searchTypeUser().then((res) => setTypeUser(res))
  }, [])

  const { navigation, route } = props;
  const { params } = route
  return (
    <SendMoneyProvider>
      <SenMoneyStack.Navigator>
        <SenMoneyStack.Screen name="Enviar" component={SendMoneyContainer} />
        <SenMoneyStack.Screen name="Directorio" component={Directory} />
        <SenMoneyStack.Screen name="AddBeneficiario" component={AddDirectory} options={{ title: 'Nuevo beneficiario' }} />
      </SenMoneyStack.Navigator>
    </SendMoneyProvider>
  );
}

const styles = StyleSheet.create({
  viewLoading: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

const mapDispatchToProps = dispatch => ({
  searchTypeUser: () => dispatch(searchTypeUser()),
});

export default connect(null, mapDispatchToProps)(SendMoneyStackScreen);
