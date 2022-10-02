const InitalState = {
    directoryAll: null,
    directory: null,
    step: 1
}

const DirectoryReducers = (state = InitalState, action) => {
    switch (action.type) {
        case 'LOAD_DIRECTORY': {
            return { ...state, directory: action.payload, directoryAll: action.payload };
        }
        case 'ADD_DIRECTORY': {
            let directoryCurrent = state.directory
            let directoryNew = directoryCurrent.push(action.payload)
            return { ...state, directory: directoryNew, directoryAll: directoryNew };
        }
        case 'SEARCH_DIRECTORY': {
            let arrayDirectory = state.directoryAll
            let arrayFilter = arrayDirectory.filter(data => data.headline.includes(action.payload) ||
                data.dni.includes(action.payload) ||
                data.phone.includes(action.payload)
            )
            return { ...state, directory: arrayFilter };
        }
        case 'SET_STEP': {
            return { ...state, step: action.payload };
        }

        default:
            return state;
    }
};

export default DirectoryReducers;