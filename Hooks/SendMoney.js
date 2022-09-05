import React, { useState } from "react";

const SendMoneyContext = React.createContext();

export function SendMoneyProvider(props) {
    const [state, setState] = useState({
        currentPosition: 1,
        loading: true,
        typeCurrency: '',
        amountSend: '',
        amountReceived: '',
        bank: '',
        accountNumber:'',
        headline: '',
        codeDni: '',
        dni: '',
        codePhone: '',
        phone: ','
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
