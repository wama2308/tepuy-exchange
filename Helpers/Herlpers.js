import { showMessage } from "react-native-flash-message";

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
        duration: 9000,
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
    let splitAmount = data.toString().split(".")    
    if (splitAmount[1].length === 1) {
        return `${splitAmount[0]}${splitAmount[1].padEnd(2, '0')}`
    }else{
        return data.toString().replace(/\./g, '')
    }
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
    let dateConvert = new Date(date*1000);
    return ('0' + dateConvert.getDate()).slice(-2) + '-' + ('0' + (dateConvert.getMonth()+1)).slice(-2) + '-' + dateConvert.getFullYear();    
}