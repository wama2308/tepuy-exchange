import React, { useEffect, useState } from 'react';
import { StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SendMoneyContainer from './SendMoney/SendMoneyContainer';
import Directory from './Directory/Directory';
import AddDirectory from './SendMoney/AddDirectory';
import { searchTypeUser } from '../../Actions/UsersActions'
import { setStep } from '../../Actions/DirectoryActions'
import { SendMoneyProvider } from '../../Hooks/SendMoney';
import { AntDesign } from '@expo/vector-icons';

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
        <SenMoneyStack.Screen
          name="Enviar"
          component={SendMoneyContainer}
          options={{
            headerLeft: () => (
              props.step > 0 ?
                <AntDesign
                  name="arrowleft"
                  size={25}
                  color="black"
                  style={{ marginRight: 10 }}
                  onPress={() => props.setStep(props.step - 1)}
                />
                :
                null
            ),
          }}
        />
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

const mapStateToProps = state => ({
  step: state.directory.step,
});

const mapDispatchToProps = dispatch => ({
  searchTypeUser: () => dispatch(searchTypeUser()),
  setStep: (data) => dispatch(setStep(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SendMoneyStackScreen);
