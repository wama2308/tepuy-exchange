import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,    
} from 'firebase/auth/react-native';
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyC1I0Kkag7lka_gkWNxGu0r2psaTAqbTEc",
    authDomain: "tepuy-exchange.firebaseapp.com",
    databaseURL: "https://tepuy-exchange-default-rtdb.firebaseio.com/",
    projectId: "tepuy-exchange",
    storageBucket: "tepuy-exchange.appspot.com",
    messagingSenderId: "635714842017",
    appId: "1:635714842017:web:d88a22c472bc6b664fafe0",
    measurementId: "G-GY5L7BJW3R"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const database = getDatabase(app);