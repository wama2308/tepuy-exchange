import React, { useState } from "react";

const SendMoneyContext = React.createContext();

export function SendMoneyProvider(props) {
    const [state, setState] = useState({
        currentPosition: 0,
        loading: true,
        typeCurrency: '',
        amountSend: '',
        amountReceived: '',
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
