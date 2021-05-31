import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {useDispatch} from "react-redux";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Menu from "../menu/Menu";

const ModifyCompany = (props) => {
    const [state, setState] = useState({
        company: {
            name: '',
            country: '',
            adress: '',
            zipcode: '',
            state:null
        }
    });
    const dispatch = useDispatch();
    const InvokeSetState = (company) => {
        setState(company)
    }
    const history = useHistory();

    let { id } = useParams();

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

    const updateCompany = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.company)
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
                        type: 'COMPANIES_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );

                InvokeSetState({company:company});
                history.push('/companies')

            })
            .catch(error => {
                InvokeSetState({company:{errorMessage: error.toString()}});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };
    const getCompany = () => {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        };
        dispatch({
            type: 'INVOKING_GET_COMPANY_SERVICE'
        });

        axios.get(`http://localhost:1337/company/${id}`).then((res)=> {
            console.log(res.data)

            dispatch({
                    type: 'GET_COMPANY_SUCCESSFULLY',
                    payload: res.data
                }
            );
            InvokeSetState({company: res.data});
        }).catch(error => {
                InvokeSetState({company:{errorMessage: error.toString()}});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };
    useEffect(()=>{
        getCompany()    }, [])
    return (

        <div>
            <Menu/>

    <div className="container-fluid">

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
                    <InputText id="zip" type="number" onChange={handleZipChanged.bind(this)}
                               value={state.company.zipcode}/>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <Button label="Update" onClick={updateCompany.bind(this)}
                            disabled={!state.company.zipcode || !state.company.name || !state.company.country || !state.company.adress}/>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ModifyCompany;