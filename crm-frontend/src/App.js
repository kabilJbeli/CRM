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
import {Switch, Route, Redirect, NavLink} from "react-router-dom";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import ContactList from "./containers/contact/ContactList";
import AddContact from "./containers/contact/AddContact";
import ModifyContact from "./containers/contact/ModifyContact";
import ItemList from "./containers/item/ItemList";
import AddItem from "./containers/item/AddItem";
import ModifyItem from "./containers/item/ModifyItem";
import {Sidebar} from 'primereact/sidebar';
import {Button} from 'primereact/button';

function App() {
    const componentDidUpdate = () => {
        document.getElementById("root").click();
    }
    const [visibleLeft, setVisibleLeft] = useState(false);
    const items = [
        {
            label: 'Companies',
            items: [
                {
                    label: 'List',
                    command: () => {
                        window.location = "/companies";
                    }
                },
                {
                    label: 'Add New',
                    command: () => {
                        window.location = "/companies/add";
                    }

                }
            ]
        },
        {
            label: 'Contacts',
            items: [
                {
                    label: 'List',
                    command: () => {
                        window.location = "/contacts";
                    }

                },
                {
                    label: 'Add New Contact',
                    command: () => {
                        window.location = "/contacts/add";
                    }
                },

            ]
        },
        {
            label: 'Items',
            items: [
                {
                    label: 'List',
                    command: () => {
                        window.location = "/items";
                    }

                },
                {
                    label: 'Add New Item',
                    command: () => {
                        window.location = "/items/add";
                    }

                }

            ]
        },
        {
            label: 'Quotes',
            items: [
                {
                    label: 'List',
                },
                {
                    label: 'Generate New Quote',
                }
            ]
        }
    ];

    return (
        <div className="App">
            <Navbar bg="#0c8da0" expand="lg">
                {!visibleLeft ?

                    <Button className="menuToggleBtn" onClick={(e) => setVisibleLeft(true)}>
                        <i className="pi pi-bars" styleName="font-size: 2rem"></i>
                    </Button>
                    : <Button className="menuToggleBtn" onClick={(e) => setVisibleLeft(false)}>
                        <i className=" pi pi-times" styleName="font-size: 2rem"></i>
                    </Button>}

                <div className="text-center text-white" style={{width: '100%'}}>
                    Customer Relationship Management System
                </div>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown title="kjbeli@vermeg.com" id="basic-nav-dropdown">
                            <NavLink to={'/logout'}>Logout</NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                <PanelMenu model={items} style={{width: '100%'}}/>
            </Sidebar>
            <Switch>
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
                <Redirect to={"/"}/>
            </Switch>
        </div>
    );

}

export default App;