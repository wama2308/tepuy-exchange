import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, SafeAreaView, Image } from 'react-native';
import { loadRates } from '../../../Actions/RatesActions'
import { connect } from 'react-redux';
import { amountConvert, completDecimal, months } from '../../../Helpers/Herlpers'
import { Card, Paragraph } from 'react-native-paper';

function Home(props) {
  const { navigation, route } = props;
  const { params } = route
  let dateCurrent = new Date();

  useEffect(() => {
    props.loadRates()
    console.log("Home")
  }, [])

  return (
    !props.rates ?
      <View style={styles.viewLoading}>
        <ActivityIndicator size={80} color='#174ea6' />
      </View>
      :
      <SafeAreaView style={styles.container}>

        <Card>
          <Card.Cover
            style={{ height: 200 }}
            source={require('../../../assets/tepuy.png')} resizeMode="contain"
          />
          <View style={styles.divider}></View>

          <Card.Title
            title="Tasa del día"
            subtitle={`${dateCurrent.getDate()} de ${months[dateCurrent.getMonth()]} de ${dateCurrent.getFullYear()}`}
          />
          <View style={styles.divider}></View>
          <Card.Content style={{ paddingVertical: 10 }}>
            <View style={{ paddingVertical: 0 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Soles
              </Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {amountConvert(completDecimal(props.rates.sol))} X 1S/
              </Text>
            </View>
            <View style={styles.dividerContent}></View>
            <View style={{ paddingVertical: 0 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Dolares
              </Text>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                {amountConvert(completDecimal(props.rates.dolar))} X 1$
              </Text>
            </View>
          </Card.Content>
        </Card>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  viewLoading: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10
  },
  dividerContent: {

    width: 320,
    height: 1,
    backgroundColor: "lightgray",
    marginHorizontal: -15,
    marginVertical: 15
  },
  // image: {
  //   justifyContent: 'flex-start',
  //   alignItems: 'center',
  //   paddingVertical: 0,
  // },
});


const mapStateToProps = state => ({
  rates: state.rates.rates,
});

const mapDispatchToProps = dispatch => ({
  loadRates: () => dispatch(loadRates()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);