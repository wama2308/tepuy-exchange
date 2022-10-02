import { flashMessageAction } from "../Helpers/Herlpers";
import { auth, database } from "../Firebase/Firebase";
import { ref, onValue, update } from "firebase/database";
import { dateNow } from '../Helpers/Herlpers';

const uidRates = 'wmMh1FtQLWfKTCJ38NB65e2uyrW0';

export const loadBanks = () => dispatch => {
    return new Promise((resolve, reject) => {
        const rates = ref(database, `banks`);
        onValue(rates, (snapshot) => {
            const data = snapshot.val();            
            if (Object.keys(data).length) {
                dispatch({
                    type: "LOAD_BANKS",
                    payload: data
                });
                resolve(data)

            } else {
                flashMessageAction('Error cargando los bancos', 'warning');
                reject()
            }
        });
    });
}