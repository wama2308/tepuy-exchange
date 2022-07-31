import { flashMessageAction } from "../Helpers/Herlpers";
import { auth, database } from "../Firebase/Firebase";
import { ref, onValue, update } from "firebase/database";
import { dateNow } from '../Helpers/Herlpers';

const uidRates = 'wmMh1FtQLWfKTCJ38NB65e2uyrW0';

export const loadRates = () => dispatch => {
    return new Promise((resolve, reject) => {
        const rates = ref(database, `rates/${uidRates}`);
        onValue(rates, (snapshot) => {
            const data = snapshot.val();
            if (Object.keys(data).length) {
                dispatch({
                    type: "LOAD_RATES",
                    payload: data
                });
                resolve(data)

            } else {
                flashMessageAction('Error cargando las tasas', 'warning');
                reject()
            }
        });
    });
}

export const updateRates = (data) => {
    return new Promise((resolve, reject) => {
        update(ref(database, `rates/${uidRates}`),
            {
                dolar: data.dolar,
                sol: data.sol,
                updated_at: dateNow(),
                updated_by: auth.currentUser.uid,
            }
        )
            .then(() => resolve())
            .catch(() => reject());
    })
}