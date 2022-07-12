import React from "react";
import RoutesNoAuth from "./Components/NoAuth/RoutesNoAuth";

import { NavigationContainer } from '@react-navigation/native';

const SelectRoute = () => {
    return (
        <NavigationContainer>
            <RoutesNoAuth />
        </NavigationContainer>
    );
}

export default SelectRoute;