import { combineReducers } from "redux";
import UsersReducer from "../Reducers/UsersReducer";
// import AplicationReducer from "../Reducers/AplicationReducer";
// import PurchasesReducer from "../Reducers/PurchasesReducer";
// import SeekerReducer from "../Reducers/SeekerReducer";

const reducers = combineReducers({
    users: UsersReducer,
    //   aplications: AplicationReducer,
    //   purchases: PurchasesReducer,
    //   seeker: SeekerReducer,
});

export default reducers;