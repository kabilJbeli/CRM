import {combineReducers} from "redux";
import CompanyListReducer from "./CompanyListReducer";
import AddCompanyReducer from "./AddCompanyReducer";
import ContactListReducer from "./ContactListReducer";
import ItemListReducer from "./ItemListReducer";

const RootReducer = combineReducers({
    CompanyList: CompanyListReducer,
    AddCompany: AddCompanyReducer,
    ContactList : ContactListReducer,
    ItemList: ItemListReducer
});

export default RootReducer;