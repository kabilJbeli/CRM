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
            <button onClick={() =>removeItem(rowData)}>Delete</button>
            <button onClick={() =>updateItem(rowData)}>Update</button>
        </div>);
    }
    const removeItem = (data) => {
        console.log(data);
    }
    const updateItem = (data) => {
        console.log(data);

    }
    const showData = () => {
        if (!_.isEmpty(contactsList.data) || _.isEmpty(contactsList.data)) {
            return (<div className="container-fluid datatable-responsive-demo " >
                <DataTable resizableColumns  columnResizeMode="fit" value={contactsList.data} className="p-datatable-striped p-datatable-gridlines p-datatable-responsive-demo">
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
            {showData()}
        </div>
    )
}
export default ContactList;