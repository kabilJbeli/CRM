import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

const ModifyContact = (props) => {
    let { id } = useParams();

    return (
        <div className="container-fluid">
            <Link to="/contacts" className="btnDashboard">
                <Button label="Back to Contacts List" icon="pi pi-chevron-left" className="btn btn-info" />
            </Link>
        Modify Contact {id}
        </div>
    )
}
export default ModifyContact;