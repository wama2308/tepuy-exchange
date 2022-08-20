import React, { useState, useEffect } from 'react';
import { SendMoneyProvider } from '../../../Hooks/SendMoney'
import SendMoney from './SendMoney';

function SendMoneyContainer() {
    useEffect(() => {
        console.log("SendMoneyContainer")
    }, [])
    return (
        <SendMoneyProvider>
            <SendMoney />
        </SendMoneyProvider>
    );
}

export default SendMoneyContainer;