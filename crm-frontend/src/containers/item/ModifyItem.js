import React from "react";
import {useParams} from "react-router";

const ModifyItem = (props) => {
    let { id } = useParams();

    return (
        <div className="container-fluid">
        Modify Item {id}
        </div>
    )
}
export default ModifyItem;