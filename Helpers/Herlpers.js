import { async } from "@firebase/util";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const flashMessageAction = (message, type) => {
    showMessage({
        message: message,
        type: type,
        icon: { icon: "auto", position: "left" },
        floating: true,
        position: "top",
        animated: true,
        animationDuration: 500,
        autoHide: true,
        duration: 3000,
        hideOnPress: true,
    })
};

export const dateNow = () => {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    return timestamp;
}

export const dataMenuHome = [
    {
        label: 'Tasas',
        route: 'Tasas'
    }
]

export const dataMenuAccount = [
    {
        label: 'Cambiar contraseña',
        route: 'changePassword'
    },
    {
        label: 'Actualizar datos',
        route: 'updateData'
    },
    {
        label: 'Cerrar sesión',
        route: 'logout'
    }
]

export const formatMonto = (data) => {
    return parseFloat(data.replace(/\./g, '').replace(/\,/g, '.'));
};

export const amountConvert = (data) => {
    let monto = data.replace(/\D/g, "")
        .replace(/([0-9])([0-9]{2})$/, '$1,$2')
        .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
    return monto
};

export const completDecimal = (data) => {
    if (data.toString().includes(".")) {
        let splitAmount = data.toString().split(".")
        if (splitAmount[1].length === 1) {
            return `${splitAmount[0]}${splitAmount[1].padEnd(2, '0')}`
        }
        return data.toString().replace(/\./g, '')
    } else {
        return `${data.toString().padEnd(data.toString().length + 2, '0')}`
    }

    // let splitAmount = data.toString().split(".")
    // if (splitAmount[1] && splitAmount[1].length === 1) {

    // } else {

    // }
};

export const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
]

export const convertUnixDate = (date) => {
    let dateConvert = new Date(date * 1000);
    return ('0' + dateConvert.getDate()).slice(-2) + '-' + ('0' + (dateConvert.getMonth() + 1)).slice(-2) + '-' + dateConvert.getFullYear();
}

export const convertCapitalize = (value) => {
    const publicacion = value;
    return publicacion[0].toUpperCase() + publicacion.substring(1);
}

export const symbolCurrency = (value) => {
    const objectSymbol = {
        dolar: '$',
        sol: 'S/'
    }
    return objectSymbol[value]
}

export const dosDecimales = (n) => {
    let t = n.toString();
    let regex = /(\d*.\d{0,2})/;
    return t.match(regex)[0];
}

export const saveLocalStorageSendMoney = async (data) => {
    try {
        await AsyncStorage.setItem(
            'sendStepMoney',
            JSON.stringify(data)
        );
    } catch (error) {
        flashMessageAction('Error guardando los datos', 'warning');
    }
}

export const loadLocalStorageSendMoney = async () => {
    try {
        const value = await AsyncStorage.getItem('sendStepMoney');
        if (value !== null) {
            // We have data!!
            console.log(value);
        }
    } catch (error) {
        // Error retrieving data
    }
}
