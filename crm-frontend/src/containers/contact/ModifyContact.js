import React from "react";
import {useParams} from "react-router";

const ModifyContact = (props) => {
    let { id } = useParams();

    return (
        <div className="container-fluid">
        Modify Contact {id}
        </div>
    )
}
export default ModifyContact;