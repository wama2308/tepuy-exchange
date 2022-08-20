import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { Card } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import { useSendMoney } from '../../../Hooks/SendMoney'
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';

function SendMoney() {
  const labels = ["Monto a enviar", "Cuenta destino", "Comprobante de pago"];
  const { state, setState } = useSendMoney();
  
  useEffect(() => {
    console.log("SendMoney")
    setState(prev => ({
      ...prev,
      typeCurrency:''
  }))
  }, [])

  const selectStep = (step) => {
    const stepObject = {
      0: <StepOne />,
      1: <StepTwo />,
      2: <StepThree />
    }
    return stepObject[step]
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={{ paddingTop: 15 }}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition={state.currentPosition}
            labels={labels}
            stepCount={3}
          />
          <View style={styles.divider}></View>
          {selectStep(state.currentPosition)}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
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
    backgroundColor: "gray",
    marginVertical: 0
  },
});

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#007bff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#007bff',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#007bff',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#007bff',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#007bff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 12,
  currentStepLabelColor: '#007bff'
}

export default SendMoney;