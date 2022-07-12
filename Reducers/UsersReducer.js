const InitalState = {
    userState: null,
    infoUser: null,
}

const UsersReducer = (state = InitalState, action) => {
    switch (action.type) {
        // case 'CHECK_CONNECTION': {
        //     return { ...state, userState: action.payload };
        // }
        // case "CLOSE_CONNECTION": {
        //     return { ...state, userState: action.payload, infoUser: null };
        // }
        // case "LOADING_TRUE_LOGIN": {
        //     return { ...state, userState: null };
        // }
        // case "ERROR_LOGIN": {
        //     return { ...state, userState: action.payload };
        // }
        // case 'INFO_ACOUNT_USER': {
        //     return {
        //         ...state,
        //         infoUser: action.payload
        //     };
        // }
        default:
            return state;
    }
};

export default UsersReducer;