import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {AddNewCompany} from "../../actions/CompanyActions";

const AddCompany = (props) => {
    const dispatch = useDispatch();
    const [state,setState] = useState({company: {
            name:null,
            country: null,
            adress:null,
            zipcode: null

        }});
    const InvokeSetState =(company) => {
     setState(company)}
    const handleNameChanged = (event) => {
        // Extract the current value of the customer from state
        let company = state.company;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        company.name = modifiedValue;

        // Update the state object
        InvokeSetState({
            company: company
        });
    }


    const handleCountryChanged = (event) => {
        // Extract the current value of the customer from state
        let company = state.company;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        company.country = modifiedValue;

        // Update the state object
        InvokeSetState({
            company: company
        });
    }


    const handleZipChanged = (event) => {
        // Extract the current value of the customer from state
        let company = state.company;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        company.zipcode = modifiedValue;

        // Update the state object
        InvokeSetState({
            company: company
        });
    }

    const handleAdressChanged = (event) => {
        // Extract the current value of the customer from state
        let company = state.company;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        company.adress = modifiedValue;

        // Update the state object
        InvokeSetState({
            company: company
        });
    }

    const addCompany = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.company)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        })
        fetch('http://localhost:1337/company', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                dispatch({
                        type: 'COMPANIES_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );

            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };

    return (
        <div className="p-fluid p-formgrid p-grid">
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="name">Company Name</label>
                <InputText id="name" onChange={handleNameChanged.bind(this)} value={state.company.name}
                           type="text"/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="country">Country</label>
                <InputText id="country" type="text" onChange={handleCountryChanged.bind(this)}
                           value={state.company.country}/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="address">Address</label>
                <InputTextarea id="address" type="text" onChange={handleAdressChanged.bind(this)} rows="4"
                               value={state.company.adress}/>
            </div>
            <div className="p-field p-col-12 p-md-6">
                <label htmlFor="zip">Zip</label>
                <InputText id="zip" type="text" onChange={handleZipChanged.bind(this)}
                           value={state.company.zipcode}/>
            </div>
            <div className="p-field p-col-12 p-md-12">
                <Button label="Save" onClick={addCompany.bind(this)} disabled={!state.company.zipcode || !state.company.name || !state.company.country || !state.company.adress}/>
            </div>
        </div>
    )
}
export default AddCompany;