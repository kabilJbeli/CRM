import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {Dropdown} from 'primereact/dropdown';
import {GetCompaniesList} from "../../actions/CompanyActions";
import Store from "../../store";
import {Link, useHistory} from "react-router-dom";
import Menu from "../menu/Menu";

const AddContact = (props) => {
    const dispatch = useDispatch();
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
    const [state, setState] = useState({
        contact: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            companyID: ''

        }
    });
    const InvokeSetState = (contact) => {
        setState(contact)
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

    const addContact = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.contact)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        })
        fetch('http://localhost:1337/contact', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                let contact = state.contact;

                // Extract the value of the input element represented by `target`

                // Update the customer object's first name

                // Update the state object


                dispatch({
                        type: 'CONTACT_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );
                contact.companyID = '';
                contact.firstName = '';
                contact.lastName = '';
                contact.phone = '';
                contact.email = '';
                InvokeSetState({
                    contact: contact
                });
                history.push('/contacts')

            })
            .catch(error => {
                InvokeSetState({contact: {errorMessage: error.toString()}});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };

    return (
        <div>
            <Menu/>

            <div className="container-fluid">

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
                    <Button label="Save" onClick={addContact.bind(this)}
                            disabled={!state.contact.phone || !state.contact.firstName || !state.contact.lastName || !state.contact.email}/>
                </div>
            </div>
        </div>
        </div>
    )
}
export default AddContact;