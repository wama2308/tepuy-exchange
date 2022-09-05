import { combineReducers } from "redux";
import UsersReducer from "../Reducers/UsersReducer";
import RatesReducer from "../Reducers/RatesReducers";
import BanksReducer from "./BanksReducer";
// import PurchasesReducer from "../Reducers/PurchasesReducer";
// import SeekerReducer from "../Reducers/SeekerReducer";

const reducers = combineReducers({
    users: UsersReducer,
    rates: RatesReducer,
    banks: BanksReducer,
    //   purchases: PurchasesReducer,
    //   seeker: SeekerReducer,
});

export default reducers;