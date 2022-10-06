import React, { useState } from "react";

const SendMoneyContext = React.createContext();

export function SendMoneyProvider(props) {
    const [state, setState] = useState({
        id: '',
        currentPosition: 1,
        loading: false,
        typeCurrency: '',
        errorTypeCurrency: '',
        textErrorTypeCurrency: '',
        amountSend: '',
        errorAmountSend: '',
        textErrorAmountSend: '',
        amountReceived: '',
        errorAmountReceived: '',
        textErrorAmountReceived: '',
        bank: '',
        errorBank: '',
        textErrorBank: '',
        accountNumber: '',
        errorAccountNumber: '',
        textErrorAccountNumber: '',
        headline: '',
        errorHeadLine: '',
        textErrorHeadLine: '',
        codeDni: 'V',
        dni: '',
        errorDni: '',
        textErrorDni: '',
        codePhone: '0412',
        phone: '',
        errorPhone: '',
        textErrorPhone: '',
    });


    const onPageChange = (position) => {
        setState(prev => ({
            ...prev,
            currentPosition: position
        }))
    }


    return (
        <SendMoneyContext.Provider
            value={{
                state,
                setState,
                onPageChange
            }}
            {...props}
        />
    );
}

export function useSendMoney() {
    const context = React.useContext(SendMoneyContext);
    if (!context) {
        throw new Error("useSendMoney debe estar dentro del proveedor SendMoneyContext");
    }
    return context;
}
