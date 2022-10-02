import { combineReducers } from "redux";
import UsersReducer from "../Reducers/UsersReducer";
import RatesReducer from "../Reducers/RatesReducers";
import BanksReducer from "./BanksReducer";
import DirectoryReducers from "../Reducers/DirectoryReducers";
// import SeekerReducer from "../Reducers/SeekerReducer";

const reducers = combineReducers({
    users: UsersReducer,
    rates: RatesReducer,
    banks: BanksReducer,
    directory: DirectoryReducers,
    //   seeker: SeekerReducer,
});

export default reducers;