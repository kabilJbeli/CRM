import {combineReducers} from "redux";
import CompanyListReducer from "./CompanyListReducer";
import AddCompanyReducer from "./AddCompanyReducer";
import ContactListReducer from "./ContactListReducer";

const RootReducer = combineReducers({
    CompanyList: CompanyListReducer,
    AddCompany: AddCompanyReducer,
    ContactList : ContactListReducer
});

export default RootReducer;