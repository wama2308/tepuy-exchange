const InitalState = {
    banks: null,    
}

const BanksReducer = (state = InitalState, action) => {
    switch (action.type) {
        case 'LOAD_BANKS': {
            return { ...state, banks: action.payload };
        }
        
        default:
            return state;
    }
};

export default BanksReducer;