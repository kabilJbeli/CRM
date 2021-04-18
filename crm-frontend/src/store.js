import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import {applyMiddleware}  from "redux";
import Thunk from 'redux-thunk';
import RootReducer  from './reducers/RootReducer';
const Store = createStore(RootReducer,composeWithDevTools(applyMiddleware(Thunk)));

export default  Store;