import { flashMessageAction } from "../Helpers/Herlpers";
import { firebaseConfig } from "../Firebase/Firebase";
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
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
                    type_person: data.type_person,
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

export const loginAction = (data) => dispatch => {
    dispatch({
        type: "LOADING_TRUE_LOGIN",
        payload: null
    });
    signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            // Signed in
            console.log("userCredential ", userCredential)
            const user = userCredential.user;
            console.log("user ", user)
            if (user) {
                dispatch({
                    type: "CHECK_CONNECTION",
                    payload: user
                });
            }
            // else {
            //     dispatch({
            //         type: "ERROR_LOGIN",
            //         payload: { uid: '' }
            //     });
            // }
        })
        .catch(error => {
            dispatch({
                type: "ERROR_LOGIN",
                payload: { uid: '' }
            });
            if (error.code === 'auth/wrong-password') {
                flashMessageAction('Contraseña invalida', 'warning');
            } else if (error.code === 'auth/user-not-found') {
                flashMessageAction('Usuario invalido', 'warning');
            } else {
                flashMessageAction('Error iniciando sesión', 'warning');
            }

            // dispatch({
            //     type: "ERROR_LOGIN",
            //     payload: { uid: '' }
            // });
        });
}

export const logoutAction = () => {
    console.log("logoutAction")
    signOut(auth)
        .then(() => {
            console.log("cerro sesion")
            dispatch({
                type: "CLOSE_CONNECTION",
                payload: { uid: '' }
            });
        })
        .catch(() => {
            console.log("no cerro sesion")
        });
}

export const authentication = () => dispatch => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch({
                type: "CHECK_CONNECTION",
                payload: user
            });
        } else {
            dispatch({
                type: "CLOSE_CONNECTION",
                payload: { uid: '' }
            });
        }
    });
}


export const forgotPasswordAction = (email) => {
    return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
        .then(function () {
            resolve()
        }).catch(function (error) {
            reject(error)            
        });
    })
};

export const checkConnectionFunction = (data) => dispatch => {
    dispatch({
        type: "CHECK_CONNECTION",
        payload: data
    });
};

export const closeConnectionFunction = () => dispatch => {
    dispatch({
        type: "CLOSE_CONNECTION",
        payload: { uid: '' }
    });
};

