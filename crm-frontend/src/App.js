import React, {useState} from 'react';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import {PanelMenu} from 'primereact/panelmenu';

import 'primeflex/primeflex.scss';
import './App.scss';
import Dashboard from "./containers/dashboard/Dashboard";
import CompanyList from "./containers/company/CompanyList";
import AddCompany from "./containers/company/AddCompany";
import ModifyCompany from "./containers/company/ModifyCompany";
import {Switch, Route, Redirect, NavLink, BrowserRouter} from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import ContactList from "./containers/contact/ContactList";
import AddContact from "./containers/contact/AddContact";
import ModifyContact from "./containers/contact/ModifyContact";
import ItemList from "./containers/item/ItemList";
import AddItem from "./containers/item/AddItem";
import ModifyItem from "./containers/item/ModifyItem";
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';
import QuoteList from "./containers/quote/QuoteList";
import AddQuote from "./containers/quote/AddQuote";
import ModifyQuote from "./containers/quote/ModifyQuote";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import {ProvideAuth, useAuth} from "./hooks/auth";
import PrivateRoute from "./hooks/ProtectedRoute";

function App() {
    const componentDidUpdate = () => {
        document.getElementById("root").click();
    }
    const [visibleLeft, setVisibleLeft] = useState(false);
    return (
        <div className="App">

            <ProvideAuth>
                <BrowserRouter>
                    <Switch>
                        { /*
                        <Route path={"/"} exact component={Dashboard}/>
                        <Route path={"/companies"} exact component={CompanyList}/>
                        <Route path={"/companies/add"} exact component={AddCompany}/>
                        <Route path={"/companies/modify/:id"} exact component={ModifyCompany}/>
                        <Route path={"/contacts"} exact component={ContactList}/>
                        <Route path={"/contacts/add"} exact component={AddContact}/>
                        <Route path={"/contacts/modify/:id"} exact component={ModifyContact}/>
                        <Route path={"/items"} exact component={ItemList}/>
                        <Route path={"/items/add"} exact component={AddItem}/>
                        <Route path={"/items/modify/:id"} exact component={ModifyItem}/>
                        <Route path={"/quotes"} exact component={QuoteList}/>
                        <Route path={"/quotes/add"} exact component={AddQuote}/>
                        <Route path={"/quotes/modify/:id"} exact component={ModifyQuote}/>

                        <Route path={"/sign-in"} exact component={SignIn}/>
                        <Route path={"/sign-up"} exact component={SignUp}/>
                        <Redirect to={"/"}/>
                      */}

                        <PrivateRoute path={"/dashboard"} exact >
                            <Dashboard/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/companies"} exact>
                            <CompanyList/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/companies/add"} exact >
                            <AddCompany/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/companies/modify/:id"} exact >
                            <ModifyCompany/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/contacts"} exact >
                            <ContactList/>
                        </PrivateRoute>

                        <PrivateRoute  path={"/contacts/add"} exact >
                            <AddContact/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/contacts/modify/:id"} exact >
                            <ModifyContact/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/items"} exact >
                            <ItemList/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/items/add"} exact>
                            <AddItem/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/items/modify/:id"} exact>
                            <ModifyItem/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/quotes"} exact>
                            <QuoteList/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/quotes/add"} exact>
                            <AddQuote/>
                        </PrivateRoute>
                        <PrivateRoute  path={"/quotes/modify/:id"} exact>
                            <ModifyQuote/>
                        </PrivateRoute>

                        <Route path={"/sign-in"} exact component={SignIn}/>
                        <Route path={"/sign-up"} exact component={SignUp}/>
                        <Redirect to={"/sign-in"}/>


                    </Switch>
                </BrowserRouter>
            </ProvideAuth>
        </div>
    );

}

export default App;