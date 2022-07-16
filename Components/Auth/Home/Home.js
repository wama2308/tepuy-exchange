import * as React from 'react';
import { Text, View } from 'react-native';

function Home(props) {
  console.log("home ", props)
  const { navigation, route } = props;
  const { params } = route
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => params.logoutAction()}>Home</Text>
    </View>
  );
}

export default Home;