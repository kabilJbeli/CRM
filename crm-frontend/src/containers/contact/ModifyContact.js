import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link, useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {useDispatch, useSelector} from "react-redux";
import Store from "../../store";
import {GetCompaniesList} from "../../actions/CompanyActions";
import axios from "axios";
import Menu from "../menu/Menu";

const ModifyContact = (props) => {
    let { id } = useParams();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        contact: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            companyID: ''
        }
    });
    const [companies, setCompanies] = useState([{
        name: null,
        code: null
    }]);
    const [company, setCompany] = useState({});
    var companiesList = useSelector(state => state.CompanyList);
    const history = useHistory();

    Store.subscribe(()=>{
        if(Store.getState().CompanyList) {
            companiesList = Store.getState().CompanyList;
            const list = [];
            if(companiesList.data) {
                companiesList.data.map(item => {
                    let obj = new Object();
                    obj['name'] = item.name;
                    obj['code'] = item.id;
                    list.push(obj);
                });
                setCompanies(list);
            }
        }
    });
    React.useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        dispatch(GetCompaniesList());
    }

    const InvokeSetState = (contact) => {
        setState(contact)
    }
    const InvokeSetCompany = (company) => {
        setCompany(company)
    }
    const handleFirstNameChanged = (event) => {
        // Extract the current value of the customer from state
        let contact = state.contact;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        contact.firstName = modifiedValue;

        // Update the state object
        InvokeSetState({
            contact: contact
        });
    }


    const handleLastNameChanged = (event) => {
        // Extract the current value of the customer from state
        let contact = state.contact;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        contact.lastName = modifiedValue;

        // Update the state object
        InvokeSetState({
            contact: contact
        });
    }
    const handleCompanyChanged = (event) => {
        // Extract the current value of the customer from state
        let contact = state.contact;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        contact.companyID = modifiedValue;
        setCompany(modifiedValue)
        // Update the state object
        InvokeSetState({
            contact: contact
        });
    }


    const handleEmailChanged = (event) => {
        // Extract the current value of the customer from state
        let contact = state.contact;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        contact.email = modifiedValue;

        // Update the state object
        InvokeSetState({
            contact: contact
        });
    }

    const handlePhoneChanged = (event) => {
        // Extract the current value of the customer from state
        let contact = state.contact;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        contact.phone = modifiedValue;

        // Update the state object
        InvokeSetState({
            contact: contact
        });
    }

    const updateContact = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.contact)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        });
        let company = state.company;
        fetch(`http://localhost:1337/company/${id}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                dispatch({
                        type: 'CONTACT_UPDATED_SUCCESSFULLY',
                        payload: response.data
                    }
                );
                history.push('/contacts')

            })
            .catch(error => {
                InvokeSetState({company:{errorMessage: error.toString()}});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };

    const getContact = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        dispatch({
            type: 'INVOKING_GET_COMPANY_SERVICE'
        });

        axios.get(`http://localhost:1337/contact/${id}`).then((res)=> {
            console.log(res.data)

            dispatch({
                    type: 'GET_COMPANY_SUCCESSFULLY',
                    payload: res.data
                }
            );
            InvokeSetState({contact: res.data});
            InvokeSetCompany({company:res.data.companyID.id});

        }).catch(error => {
            InvokeSetState({contact:{errorMessage: error.toString()}});
            console.error('There was an error!', error);
            dispatch({
                type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
            })
        });
    };
    useEffect(()=>{
        getContact()    }, [])
    return (
        <div>
            <Menu/>

            <div className="container-fluid">
            <Link to="/dashboard" className="btnDashboard">
                <Button label="Back to Dashboard" icon="pi pi-chevron-left" className="btn btn-info" />
            </Link>

            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">First Name</label>
                    <InputText id="name" onChange={handleFirstNameChanged.bind(this)} value={state.contact.firstName}
                               type="text"/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="country">Last Name</label>
                    <InputText id="country" type="text" onChange={handleLastNameChanged.bind(this)}
                               value={state.contact.lastName}/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="address">Email</label>
                    <InputText id="address" type="text" onChange={handleEmailChanged.bind(this)} rows="4"
                               value={state.contact.email}/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="zip">Phone</label>
                    <InputText id="zip" type="number" onChange={handlePhoneChanged.bind(this)}
                               value={state.contact.phone}/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="zip">Company</label>
                    <Dropdown optionLabel="name" optionValue="code" value={company} options={companies}
                              onChange={handleCompanyChanged.bind(this)}
                              placeholder="Select a Company"/>

                </div>

                <div className="p-field p-col-12 p-md-12">
                    <Button label="Update" onClick={updateContact.bind(this)}
                            disabled={!state.contact.phone || !state.contact.firstName || !state.contact.lastName || !state.contact.email}/>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ModifyContact;