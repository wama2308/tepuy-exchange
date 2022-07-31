const InitalState = {
    rates: null,    
}

const RatesReducer = (state = InitalState, action) => {
    switch (action.type) {
        case 'LOAD_RATES': {
            return { ...state, rates: action.payload };
        }
        
        default:
            return state;
    }
};

export default RatesReducer;