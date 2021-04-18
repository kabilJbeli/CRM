import {combineReducers} from "redux";
import CompanyListReducer from "./CompanyListReducer";
import AddCompanyReducer from "./AddCompanyReducer";

const RootReducer = combineReducers({
    CompanyList: CompanyListReducer,
    AddCompany: AddCompanyReducer

});

export default RootReducer;