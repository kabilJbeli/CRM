import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetCompaniesList} from "../../actions/CompanyActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {Link} from "react-router-dom";

const CompanyList = (props) => {
    const dispatch = useDispatch();
    const companiesList = useSelector(state => state.CompanyList);
    React.useEffect(() => {
        fetchData()
    }, []);
    const fetchData = () => {
        dispatch(GetCompaniesList());
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
        fetch('http://localhost:1337/company', requestOptions)
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
            <Link to={`/companies/modify/${rowData.id}`}>
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
        if (!_.isEmpty(companiesList.data) || _.isEmpty(companiesList.data)) {
            return (<div className="container-fluid datatable-responsive-demo ">
                <Link to="/dashboard" className="btnDashboard">
                <Button label="Back to Dashboard" icon="pi pi-chevron-left" className="btn btn-info" />
                </Link>

                <DataTable paginator rows={10} resizableColumns columnResizeMode="fit" value={companiesList.data} className="p-datatable-striped p-datatable-gridlines p-datatable-responsive-demo">
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="name" header="Name" sortable></Column>
                    <Column field="country" header="Country" sortable></Column>
                    <Column field="adress" header="Adress" sortable></Column>
                    <Column header="Action" body={actionsBodyTemplate}></Column>
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