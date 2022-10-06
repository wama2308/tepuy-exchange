import { auth, database } from "../Firebase/Firebase";
import { ref, set, onValue, push, query, orderByChild, update, equalTo } from "firebase/database";
import { dateNow } from '../Helpers/Herlpers';

export const registerFireBaseDirectory = (data) => {
    return new Promise((resolve, reject) => {
        const postListRef = ref(database, `directory/${auth.currentUser.uid}`);
        const newPostRef = push(postListRef);
        const keyHeadline = newPostRef.key;

        set(newPostRef, {
            bank: data.bank,
            accountNumber: data.accountNumber,
            headline: data.headline,
            codeDni: data.codeDni,
            dni: data.dni,
            codePhone: data.codePhone,
            phone: data.phone,
            active: data.active,
            created_at: dateNow(),
            created_by: auth.currentUser.uid,
            updated_at: dateNow(),
            updated_by: auth.currentUser.uid,
        })
            .then(() => {                
                resolve(keyHeadline)
            })
            .catch(() => reject());
    })
}

export const loadDirectory = () => dispatch => {
    return new Promise((resolve, reject) => {
        const directoryRef = query(ref(database, `directory/${auth.currentUser.uid}`), orderByChild('active'), equalTo(true));
        onValue(directoryRef, (snapshot) => {
            let arrayDirectory = [];
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                arrayDirectory.push({ ...childData, id: childKey })
            });
            if (arrayDirectory.length) {
                resolve()
                dispatch({
                    type: "LOAD_DIRECTORY",
                    payload: arrayDirectory.reverse()
                });
            } else {
                reject()
                dispatch({
                    type: "LOAD_DIRECTORY",
                    payload: []
                });
            }
        });
    })
}

export const deleteDirectory = (id) => {
    return new Promise((resolve, reject) => {
        update(ref(database, `directory/${auth.currentUser.uid}/${id}`),
            {
                active: false,
                updated_at: dateNow(),
                updated_by: auth.currentUser.uid,
            }
        )
            .then(() => resolve())
            .catch(() => reject());
    })
}

export const searchDirectory = (data) => dispatch => {
    dispatch({
        type: "SEARCH_DIRECTORY",
        payload: data
    });
}

export const setStep = (data) => dispatch => {
    dispatch({
        type: "SET_STEP",
        payload: data
    });
}