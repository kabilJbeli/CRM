import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetCompaniesList} from "../../actions/CompanyActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

const CompanyList = () => {
    const dispatch = useDispatch();
    const companiesList = useSelector(state => state.CompanyList);
    React.useEffect(() => {
        fetchData()
    }, []);
    const fetchData = () => {
        dispatch(GetCompaniesList());
    }
    const actionsDeleteBodyTemplate = (rowData) => {
        return (
            <button onClick={() =>removeItem(rowData)}>Delete</button>
        );
    }
    const actionsUpdateBodyTemplate = (rowData) => {
        return (
            <button onClick={() =>updateItem(rowData)}>Update</button>
        );
    }
    const removeItem = (data) => {
        console.log(data);
    }
    const updateItem = (data) => {
        console.log(data);

    }
    const showData = () => {
        if (!_.isEmpty(companiesList.data)) {
            return (<div className="container-fluid datatable-responsive-demo ">
                <DataTable resizableColumns columnResizeMode="fit" value={companiesList.data} className="p-datatable-striped p-datatable-gridlines p-datatable-responsive-demo">
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="country" header="Country" sortable></Column>
                    <Column field="adress" header="Adress" sortable></Column>
                    <Column header="Delete" body={actionsDeleteBodyTemplate}></Column>
                    <Column header="Update" body={actionsUpdateBodyTemplate}></Column>

                </DataTable>
            </div>)
        }

        if (companiesList.loading) {
            return <p>Still Loading</p>
        }
        if (companiesList.errorMsg !== '') {
            return <p>{companiesList.errorMsg}</p>
        }
        return <p>Unable to get Data</p>
    }
    return (
        <div>
            {showData()}
        </div>
    )
}
export default CompanyList;