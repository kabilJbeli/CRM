import React from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";

const ModifyItem = (props) => {
    let { id } = useParams();

    return (
        <div className="container-fluid">
            <Link to="/items" className="btnDashboard">
                <Button label="Back to Items List" icon="pi pi-chevron-left" className="btn btn-info" />
            </Link>
        Modify Item {id}
        </div>
    )
}
export default ModifyItem;