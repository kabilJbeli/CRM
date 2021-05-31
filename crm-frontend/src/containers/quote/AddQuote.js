import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {useDispatch, useSelector} from "react-redux";
import Store from "../../store";
import { Multiselect } from 'multiselect-react-dropdown';
import {GetCompaniesList} from "../../actions/CompanyActions";
import {GetItemsList} from "../../actions/ItemActions";
import Menu from "../menu/Menu";

const AddQuote = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [companies, setCompanies] = useState([{
        name: null,
        code: null
    }]);
    const [company, setCompany] = useState({});
    var companiesList = useSelector(state => state.CompanyList);





    const [items, setItems] = useState([{
        name: null,
        code: null
    }]);
    const [item, setItem] = useState({});
    var itemsList = useSelector(state => state.ItemList);

    Store.subscribe(()=>{
        if(Store.getState().ItemList) {
            itemsList = Store.getState().ItemList;
            const list = [];
            if(itemsList.data) {
                itemsList.data.map(item => {
                    let obj = new Object();
                    obj['name'] = item.name;
                    obj['code'] = item.id;
                    list.push(obj);
                });
                setItems(list);
            }
        }
    });


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
        dispatch(GetItemsList());
    }
    const [state, setState] = useState({
        quote: {
            total: 0,
            reduction: 0,
            status:'Pending',
            clientID: '',
            items:[]
        }
    });
    const handleCompanyChanged = (event) => {
        // Extract the current value of the customer from state
        let quote = state.quote;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        quote.clientID = modifiedValue;
        setCompany(modifiedValue)
        // Update the state object
        InvokeSetState({
            quote: quote
        });
    }


    const handleItemChanged = (event) => {
        // Extract the current value of the customer from state
        let quote = state.quote;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        quote.items = modifiedValue;
        setItem(modifiedValue)
        // Update the state object
        InvokeSetState({
            quote: quote
        });
    }


    const handleReductionChanged = (event) => {
        // Extract the current value of the customer from state
        let quote = state.quote;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        quote.reduction = parseInt(modifiedValue);

        // Update the state object
        InvokeSetState({
            quote: quote
        });
    }
    const InvokeSetState = (quote) => {
        setState(quote)
    }
    const  onSelect= (selectedList, selectedItem) =>{
        let quote = state.quote;

        // Extract the value of the input element represented by `target`

        // Update the customer object's first name
       selectedList.map(i=>{
           quote.items.push(i.code)
        });
        setItem(selectedList)
        // Update the state object
        InvokeSetState({
            quote: quote
        });
    }

    const onRemove= (selectedList, removedItem)=> {
        let quote = state.quote;

        // Extract the value of the input element represented by `target`

        // Update the customer object's first name
        quote.items = selectedList;
        setItem(selectedList)
        // Update the state object
        InvokeSetState({
            quote: quote
        });
    }

    const handleQuantityChanged = (event) => {
        // Extract the current value of the customer from state
        let quote = state.quote;

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        quote.total = parseInt(modifiedValue);

        // Update the state object
        InvokeSetState({
            quote: quote
        });
    }
    const addQuote = (e) => {

        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.quote)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        })
        let quote = state.quote;

        fetch('http://localhost:1337/quote', requestOptions)
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
                quote.clientID='';
                quote.items=[];
                quote.name=''
                quote.total=0;
                quote.reduction=0;
                InvokeSetState({quote : quote});

                history.push('/quotes');

            })
            .catch(error => {
                InvokeSetState({quote : {errorMessage: error.toString()}});
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
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="zip">Contact</label>
                    <Dropdown optionLabel="name" optionValue="code" value={company} options={companies}
                              onChange={handleCompanyChanged.bind(this)}
                              placeholder="Select a Company"/>

                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="zip">Items</label>

                    <Multiselect
                        options={items} // Options to display in the dropdown
                        selectedValues={item} // Preselected value to persist in dropdown
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name" // Property name to display in the dropdown options
                        placeholder="Select Items"
                        showArrow={true}
                        closeIcon="cancel"
                    />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="description">Reduction</label>
                    <InputText id="reduction" type="number" onChange={handleReductionChanged.bind(this)} />
                </div>
                <div className="p-field p-col-12 p-md-6">
                    <label htmlFor="quantity">Total</label>
                    <InputText id="quantity" type="number"  onChange={handleQuantityChanged.bind(this)} />
                </div>
                <div className="p-field p-col-12 p-md-12">
                    <Button label="Save" onClick={addQuote.bind(this)}
                      />                </div>
            </div>
        </div>
        </div>
    )
}
export default AddQuote;