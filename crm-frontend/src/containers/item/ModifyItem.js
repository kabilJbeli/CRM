import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link, useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import axios from "axios";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {useDispatch} from "react-redux";
import Menu from "../menu/Menu";

const ModifyItem = (props) => {
    let { id } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const [state, setState] = useState({
        item: {
            name: '',
            description: '',
            price: '',
            quantity: ''
        }
    });

    const InvokeSetState = (item) => {
        setState(item)
    }
    const handleNameChanged = (event) => {
        // Extract the current value of the customer from state
        let item = state.item;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        item.name = modifiedValue;

        // Update the state object
        InvokeSetState({
            item: item
        });
    }


    const handlePriceChanged = (event) => {
        // Extract the current value of the customer from state
        let item = state.item;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        item.price = modifiedValue;

        // Update the state object
        InvokeSetState({
            item: item
        });
    }


    const handleDescriptionChanged = (event) => {
        // Extract the current value of the customer from state
        let item = state.item;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        item.description = modifiedValue;

        // Update the state object
        InvokeSetState({
            item: item
        });
    }

    const handleQuantityChanged = (event) => {
        // Extract the current value of the customer from state
        let item = state.item;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        item.quantity = modifiedValue;

        // Update the state object
        InvokeSetState({
            item: item
        });
    }




    const updateItem = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.item)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        });
        let company = state.company;
        fetch(`http://localhost:1337/item/${id}`, requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                history.push('/items');
                dispatch({
                        type: 'COMPANIES_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );



            })
            .catch(error => {
                InvokeSetState({item:{errorMessage: error.toString()}});
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

        axios.get(`http://localhost:1337/item/${id}`).then((res)=> {
            dispatch({
                    type: 'GET_COMPANY_SUCCESSFULLY',
                    payload: res.data
                }
            );
            InvokeSetState({item: res.data});
        }).catch(error => {
            InvokeSetState({item:{errorMessage: error.toString()}});
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
            <Link to="/dashboard" className="btnDashboard">
                <Button label="Back to Dashboard" icon="pi pi-chevron-left" className="btn btn-info" />
            </Link>

            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" onChange={handleNameChanged.bind(this)} value={state.item.name}
                               type="text"/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="price">Price</label>
                    <InputText id="price" type="number" onChange={handlePriceChanged.bind(this)}
                               value={state.item.price}/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" type="text" onChange={handleDescriptionChanged.bind(this)} rows="4"
                                   value={state.item.description}/>
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="quantity">Quantity</label>
                    <InputText id="quantity" type="number" onChange={handleQuantityChanged.bind(this)}
                               value={state.item.quantity}/>
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <Button label="Update" onClick={updateItem.bind(this)}
                            disabled={!state.item.name || !state.item.quantity || !state.item.description || !state.item.price}/>
                </div>
            </div>
        </div>
        </div>
    )
}
export default ModifyItem;