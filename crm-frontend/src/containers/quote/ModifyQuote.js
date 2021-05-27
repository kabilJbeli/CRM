import React, {useState} from "react";
import {useParams} from "react-router";
import Menu from "../menu/Menu";

const ModifyQuote = (props) => {
    let { id } = useParams();

    return (
        <div>
            <Menu/>

            <div className="container-fluid ">
        Modify Quote:    {id}
        </div>
        </div>
    )
}
export default ModifyQuote;