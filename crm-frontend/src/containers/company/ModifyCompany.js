import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

const ModifyCompany = (props) => {
    let { id } = useParams();

    return (
        <div className="container-fluid">
            <Link to="/companies" className="btnDashboard">
                <Button label="Back to companies List" icon="pi pi-chevron-left" className="btn btn-info" />
            </Link>
        Update Company {id}
        </div>
    )
}
export default ModifyCompany;