import React from "react";
import {useParams} from "react-router";

const ModifyCompany = (props) => {
    let { id } = useParams();

    return (
        <div className="container-fluid">
        Update Company {id}
        </div>
    )
}
export default ModifyCompany;