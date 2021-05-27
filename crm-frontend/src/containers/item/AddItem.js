import React, {useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {useDispatch, useSelector} from "react-redux";
import {Link, useHistory} from "react-router-dom";
import Menu from "../menu/Menu";

const AddItem = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

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

    const addItem = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.item)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        })
        let item = state.item;

        fetch('http://localhost:1337/item', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                dispatch({
                        type: 'ITEMS_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );
                item.quantity='';
                item.description='';
                item.name='';
                item.price='';
InvokeSetState({item : item});

                history.push('/items');

            })
            .catch(error => {
                InvokeSetState({item : {errorMessage: error.toString()}});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_ITEM_ADD_SERVICE'
                })
            });
    };

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
                    <Button label="Save" onClick={addItem.bind(this)}
                            disabled={!state.item.name || !state.item.quantity || !state.item.description || !state.item.price}/>
                </div>
            </div>
        </div>
        </div>
    )
}
export default AddItem;