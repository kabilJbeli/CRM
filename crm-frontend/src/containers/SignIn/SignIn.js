import {useAuth} from "../../hooks/auth";
import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {Link, useHistory} from "react-router-dom";

const SignIn = (props) => {
    const auth = useAuth();
    const history = useHistory();

    const credentials={email:null,password:null};

    const [state,setState]= useState({
        credentials:credentials
    })
    const onSubmit = () => {
        auth.signin(state.credentials);
    }
    const handleEmailChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;
let credential = state.credentials;
        // Update the customer object's first name
        credential.email = modifiedValue;
setState({credentials:credential});
        // Update the state object

    }

    const handlePasswordChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        let credential = state.credentials;
        // Update the customer object's first name
        credential.password = modifiedValue;
        setState({credentials:credential});
        // Update the state object

    }
    return (
        <div class="sign-in">
            <div class="sign-in-header">
                Customer Relationship Management System
            </div>
            <div className="sign-in-section">
                <div class="description-section">
                    <h1>Customer Relationship Management</h1>
                </div>
            <div class="h-100 d-flex align-items-center sign-form-wrapper">
            <div class="sign-in-content">
                <h1 className="text-center mt-3">Sign In</h1>
                <div>
            <InputText required placeholder="email" id="email" onChange={handleEmailChanged.bind(this)}
                       type="email"/>

            <InputText required placeholder="****" id="password" onChange={handlePasswordChanged.bind(this)}
                       type="password"/>

            <Button label="Sign In" disabled={!state.credentials.email || !state.credentials.password } onClick={onSubmit.bind(this)}/>
              <Link to="/sign-up" className="text-center text-white">
                    Create An Account
                </Link>
                </div>

            </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn;