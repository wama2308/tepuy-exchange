import React, { useEffect } from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { loadRates } from '../../../Actions/RatesActions'
import { connect } from 'react-redux';

function Home(props) {
  const { navigation, route } = props;
  const { params } = route

  useEffect(() => {
    props.loadRates()
  }, [])

  return (
    !props.rates ?
      <View style={styles.viewLoading}>
        <ActivityIndicator size={80} color='#174ea6' />
      </View>
      :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={() => params.logoutAction()}>Home</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Button onPress={() => navigation.navigate('Tasas')} title="epale" />
      </View>
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
  rates: state.rates.rates,
});

const mapDispatchToProps = dispatch => ({
  loadRates: () => dispatch(loadRates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);