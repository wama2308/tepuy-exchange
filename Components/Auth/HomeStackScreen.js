import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home/Home';
import Rate from './Rate/Rate';
import { searchTypeUser } from '../../Actions/UsersActions'
import MenuRight from '../MenuRight';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen(props) {
  const [typeUser, setTypeUser] = useState(null)

  useEffect(() => {
    searchTypeUser().then((res) => setTypeUser(res))
  }, [])

  const { navigation, route } = props;
  const { params } = route
  return (
    !typeUser ?
      <View style={styles.viewLoading}>
        <ActivityIndicator size={80} color='#174ea6' />
      </View>
      :
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={Home}
          initialParams={{ logoutAction: params.logoutAction }}
          options={{
            headerRight: () => (
              typeUser && typeUser.type_user === 'admin' ?
                <MenuRight
                  navigation={navigation}
                  option='home'
                />
                :
                <></>
            ),
          }}
        />
        <HomeStack.Screen name="Tasas" component={Rate} />
      </HomeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  viewLoading: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
});

export default HomeStackScreen;
