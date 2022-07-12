import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from "./Store/Store";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import SelectRoute from './SelectRoute';
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";

export default function App() {
  console.log("aqui wama")
  useEffect(() => {
    LogBox.ignoreAllLogs()
  }, [])

  return (
    <Provider store={configureStore()}>  
      <SelectRoute />      
      <StatusBar translucent={false} backgroundColor="#ffffff" />
      <FlashMessage />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
