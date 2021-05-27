import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {GetItemsList} from "../../actions/ItemActions";
import {Link} from "react-router-dom";
import Menu from "../menu/Menu";

const ItemList = () => {
    const dispatch = useDispatch();
    const itemsList = useSelector(state => state.ItemList);
    React.useEffect(() => {
        fetchData()
    }, []);
    const fetchData = () => {
        dispatch(GetItemsList());
    }

    const deleteCompany = (item) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
        };
        dispatch({
            type: 'INVOKING_COMPANY_DELETE_SERVICE'
        })
        fetch('http://localhost:1337/item', requestOptions)
            .then(async response => {
                const data = await response.json();
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                fetchData();

            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_DELETE_SERVICE'
                })
            });
    };

    const actionsBodyTemplate = (rowData) => {
        return (<div>
            <button className="btn btn-outline-danger mr-2" onClick={() =>removeItem(rowData)}>Delete</button>
            <Link to={`/items/modify/${rowData.id}`}>
                <button className="btn btn-outline-info">Update</button>
            </Link>
        </div>);
    }
    const removeItem = (data) => {
        deleteCompany(data)
    }

    const updateItem = (data) => {
        console.log(data);

    }

    const showData = () => {
        if (!_.isEmpty(itemsList.data) || _.isEmpty(itemsList.data) ) {
            return (<div className="container-fluid datatable-responsive-demo ">
                <Link to="/dashboard" className="btnDashboard">
                    <Button label="Back to Dashboard" icon="pi pi-chevron-left" className="btn btn-info" />
                </Link>
                <DataTable paginator rows={5} resizableColumns columnResizeMode="fit" value={itemsList.data} className="p-datatable-striped p-datatable-gridlines p-datatable-responsive-demo">
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="price" header="Price" sortable></Column>
                    <Column field="description" header="Description" sortable></Column>
                    <Column field="quantity" header="Quantity" sortable></Column>
                    <Column header="Action" body={actionsBodyTemplate}></Column>
                </DataTable>
            </div>)
        }

        if (itemsList.loading) {
            return <p>Still Loading</p>
        }
        if (itemsList.errorMsg !== '') {
            return <p>{itemsList.errorMsg}</p>
        }
        return <p>Unable to get Data</p>
    }

    return (
        <div>
                <Menu/>

                {showData()}
        </div>
    )
}
export default ItemList;