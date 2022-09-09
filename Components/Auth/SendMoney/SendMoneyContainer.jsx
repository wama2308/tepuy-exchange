import React, { useEffect } from 'react';
import SendMoney from './SendMoney';

function SendMoneyContainer(props) {
    const { navigation, route } = props;
    
    return (
        <SendMoney navigation={navigation} />
    );
}

export default SendMoneyContainer;