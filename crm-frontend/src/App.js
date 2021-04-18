import React from 'react';
import 'primeflex/primeflex.scss';

import './App.scss';

import Dashboard from "./containers/dashboard/Dashboard";
import CompanyList from "./containers/company/CompanyList";
import AddCompany from "./containers/company/AddCompany";
import ModifyCompany from "./containers/company/ModifyCompany";
import {Switch, Route, Redirect,NavLink} from "react-router-dom";
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
function App() {
 const   componentDidUpdate =() =>{
        document.getElementById("root").click();
    }
    return (
        <div className="App">

            <Navbar bg="#0c8da0" expand="lg">
                <NavLink to={'/'} >Dashboard
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="Company" id="basic-nav-dropdown">
                            <NavLink to={'/companies'} >List</NavLink>
                            <NavLink to={'/companies/add'} >Add a Company</NavLink>
                        </NavDropdown>
                        <NavDropdown title="Contact" id="basic-nav-dropdown">
                            <NavLink to={'/contacts'} >List</NavLink>
                            <NavLink to={'/contacts/add'} >Add a Contact</NavLink>
                        </NavDropdown>
                        <NavDropdown title="Item" id="basic-nav-dropdown">
                            <NavLink to={'/items'} >List</NavLink>
                            <NavLink to={'/items/add'} >Add an Item</NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Switch>
                <Route path={"/"} exact component={Dashboard}/>
                <Route path={"/companies"} exact component={CompanyList}/>
                <Route path={"/companies/add"} exact component={AddCompany}/>
                <Route path={"/companies/modify/:id"} exact component={ModifyCompany}/>
                <Redirect to={"/"} />
            </Switch>
        </div>
    );
}
export default App;