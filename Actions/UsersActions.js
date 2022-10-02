import { flashMessageAction } from "../Helpers/Herlpers";
import { auth, database } from "../Firebase/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    sendEmailVerification,
    EmailAuthProvider,
    updatePassword,
    reauthenticateWithCredential,
} from 'firebase/auth/react-native';
import { ref, set, onValue, update } from "firebase/database";
import { dateNow } from '../Helpers/Herlpers';



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
                    type_user: data.type_person,
                    referred: data.referred,
                    business: data.business,
                    active: true,
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
            const user = userCredential.user;
            //console.log("user ", user)
            if (user && user.emailVerified) {
                dispatch({
                    type: "CHECK_CONNECTION",
                    payload: user
                });
            } else if (user && !user.emailVerified) {
                flashMessageAction('¡Su email no ha sido verificado, por favor revise su bandeja de entrada o spam para verificar su cuenta!', 'warning');
                dispatch({
                    type: "ERROR_LOGIN",
                    payload: { uid: '' }
                });
            } else {
                dispatch({
                    type: "ERROR_LOGIN",
                    payload: { uid: '' }
                });
            }
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

export const logoutAction = () => dispatch => {
    dispatch({
        type: "LOADING_TRUE_LOGIN",
        payload: null
    });
    signOut(auth)
        .then(() => {
            dispatch({
                type: "CLOSE_CONNECTION",
                payload: { uid: '' }
            });
        })
        .catch(() => {
            console.log("no se pudo cerrar la sesion")
        });
}

export const authentication = () => dispatch => {
    onAuthStateChanged(auth, (user) => {
        //console.log("authentication ", user)
        if (user && user.emailVerified) {
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

export const verifyuser = () => {
    return new Promise((resolve, reject) => {
        sendEmailVerification(auth.currentUser)
            .then(function () {
                console.log("Email de verificacion enviado");
                resolve()
            }).catch(function (error) {
                console.log("Error enviando email de verificacion ", error);
                reject()
            });
    });
}

export const searchUsersBusiness = () => {
    return new Promise((resolve) => {
        const usersBusiness = ref(database, 'users');
        onValue(usersBusiness, (snapshot) => {
            let arrayBusiness = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                if (childData.type_user === 'juridica' && childData.active) {
                    arrayBusiness.push(
                        {
                            label: `${childData.names} ${childData.surnames}`,
                            value: childKey
                        }
                    )
                }
                resolve(arrayBusiness)
            });
        });
    });
};

export const searchTypeUser = () => dispatch => {
    return new Promise((resolve) => {
        const usersBusiness = ref(database, `users/${auth.currentUser.uid}`);
        onValue(usersBusiness, (snapshot) => {
            const data = snapshot.val();
            if (Object.keys(data).length) {
                resolve(data)
                dispatch({
                    type: "INFO_ACOUNT_USER",
                    payload: data
                });
            }
        });
    });
};

const reauthenticate = (currentPassword) => {
    return new Promise((resolve, reject) => {
        let credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error.code)
            })
    })
}

export const changePasswordUserAction = (data) => {
    return new Promise((resolve, reject) => {
        reauthenticate(data.currentPassword)
            .then((res) => {
                updatePassword(auth.currentUser, data.password)
                    .then(() => {
                        resolve()
                    }).catch(() => {
                        flashMessageAction('Error cambiando la contraseña', 'warning');
                    });
            })
            .catch((error) => {
                if (error === 'auth/wrong-password') {
                    flashMessageAction('Contraseña invalida', 'warning');
                } else {
                    flashMessageAction('Error reautenticando al usuario para cambiar la contraseña', 'warning');
                }
                reject(error)
            })
    })
}

export const updateUserDataBasic = (data) => {
    return new Promise((resolve, reject) => {
        update(ref(database, `users/${auth.currentUser.uid}`),
            {
                names: data.names,
                surnames: data.surnames,
                code_phone: data.code_phone,
                phone: data.phone,
                type_user: data.type_person,
                updated_at: dateNow(),
                updated_by: auth.currentUser.uid,
            }
        )
            .then(() => resolve())
            .catch(() => reject());
    })
}


