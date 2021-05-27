import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import "primereact/resources/primereact.css";
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {GetContactsList} from "../../actions/ContactActions";
import {GetCompaniesList} from "../../actions/CompanyActions";
import {Link} from "react-router-dom";
import Menu from "../menu/Menu";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const dispatch = useDispatch();
    const contactsList = useSelector(state => state.ContactList);
    React.useEffect(() => {
        fetchData();
        setContacts(contactsList);
    }, []);
    const fetchData = () => {
        dispatch(GetContactsList());
        dispatch(GetCompaniesList());
    }
    const actionsBodyTemplate = (rowData) => {
        return (<div>
            <button className="btn btn-outline-danger mr-2" onClick={() =>removeItem(rowData)}>Delete</button>
            <Link to={`/contacts/modify/${rowData.id}`}>
                <button className="btn btn-outline-info">Update</button>
            </Link>
        </div>);
    }

    const deleteContact = (item) => {

        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(item)
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
                fetchData();
            })
            .catch(error => {
                this.setState({errorMessage: error.toString()});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
                })
            });
    };

    const removeItem = (data) => {
        deleteContact(data);
    }
    const updateItem = (data) => {
        console.log(data);

    }
    const showData = () => {
        if (!_.isEmpty(contactsList.data) || _.isEmpty(contactsList.data)) {
            return (<div className="container-fluid datatable-responsive-demo " >
                <Link to="/dashboard" className="btnDashboard">
                    <Button label="Back to Dashboard" icon="pi pi-chevron-left" className="btn btn-info" />
                </Link>
                <DataTable paginator rows={5} resizableColumns  columnResizeMode="fit" value={contactsList.data} className="p-datatable-striped p-datatable-gridlines p-datatable-responsive-demo">
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="firstName" header="First Name" sortable></Column>
                    <Column field="lastName" header="Last Name" sortable></Column>
                    <Column field="email" header="Email" sortable></Column>
                    <Column field="phone" header="Phone" sortable></Column>
                    <Column field="companyID.name" header="Company" sortable></Column>
                    <Column header="Action" body={actionsBodyTemplate}></Column>
                </DataTable>
            </div>)
        }

        if (contactsList.loading) {
            return <p>Still Loading</p>
        }
        if (contactsList.errorMsg !== '') {
            return <p>{contactsList.errorMsg}</p>
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
export default ContactList;