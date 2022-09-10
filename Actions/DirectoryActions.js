import { auth, database } from "../Firebase/Firebase";
import { ref, set } from "firebase/database";
import { dateNow } from '../Helpers/Herlpers';

export const registerFireBaseDirectory = (data) => {
    return new Promise((resolve, reject) => {
        set(ref(database, 'directory/' + auth.currentUser.uid), {
            accountNumber: data.accountNumber,
            headline: data.headline,
            codeDni: data.codeDni,
            dni: data.dni,
            codePhone: data.codePhone,
            phone: data.phone,
            active: true,
            created_at: dateNow(),
            created_by: auth.currentUser.uid,
            updated_at: dateNow(),
            updated_by: auth.currentUser.uid,
        })
            .then(() => resolve())
            .catch(() => reject());
    })
}