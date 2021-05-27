import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {Link, NavLink, useHistory} from "react-router-dom";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuItem from "@material-ui/core/MenuItem";
import {Sidebar} from "primereact/sidebar";
import {PanelMenu} from "primereact/panelmenu";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

const Menu = (props) => {
    const history = useHistory();

    const dispatch = useDispatch();
    const [visibleLeft, setVisibleLeft] = useState(false);

    const items = [
        {
            label: 'Companies',
            items: [
                {
                    label: 'List',
                    command: () => {
                        history.push('/companies');

                    }
                },
                {
                    label: 'Add New',
                    command: () => {
                        history.push('/companies/add');

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
                        history.push('/contacts');

                    }

                },
                {
                    label: 'Add New Contact',
                    command: () => {
                        history.push('/contacts/add');

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
                        history.push('/items');

                    }

                },
                {
                    label: 'Add New Item',
                    command: () => {
                        history.push('/items/add');

                    }

                }

            ]
        },
        {
            label: 'Quotes',
            items: [
                {
                    label: 'List',
                    command: () => {
                        history.push('/quotes');
                    }
                },
                {
                    label: 'Generate New Quote',
                    command: () => {
                        history.push('/quotes/add');
                    }
                }
            ]
        }
    ];

    return (
        <div>
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
                            <NavLink to={'/sign-in'}>Logout</NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
                <PanelMenu model={items} style={{width: '100%'}}/>
            </Sidebar>
        </div>
    )
}
export default Menu;