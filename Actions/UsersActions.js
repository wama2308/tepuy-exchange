import { firebaseConfig } from "../Firebase/Firebase";
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
    createUserWithEmailAndPassword
} from 'firebase/auth/react-native';
import { getDatabase, ref, set } from "firebase/database";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { dateNow } from '../Helpers/Herlpers';

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

const database = getDatabase(app);

export const registerFireBaseUser = (data) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    names: data.names,
                    surnames: data.surnames,
                    email: data.email,
                    code_phone: data.code_phone,
                    phone: data.phone,
                    created_at: dateNow(),
                    created_by: user.uid,
                    updated_at: dateNow(),
                    updated_by: user.uid,
                })
                    .then(() => resolve())
                    .catch(() => reject());
            })
            .catch((error) => {
                reject(error)
            });
    })
};