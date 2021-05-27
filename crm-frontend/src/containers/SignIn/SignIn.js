import {useAuth} from "../../hooks/auth";
import {InputText} from "primereact/inputtext";
import React from "react";
import {Button} from "primereact/button";
import {useHistory} from "react-router-dom";

const SignIn = (props) => {
    const auth = useAuth();
    const history = useHistory();

    const credentials={email:null,password:null};
    const onSubmit = () => {
        auth.signin(credentials);
        history.push('/');

    }
    const handleEmailChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        credentials.email = modifiedValue;

        // Update the state object

    }

    const handlePasswordChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        credentials.password = modifiedValue;

        // Update the state object

    }
    return (
        <div class="sign-in">
            <div class="sign-in-header">
                Customer Relationship Management System
            </div>
            <div class="h-100 d-flex align-items-center">
            <div class="sign-in-content">
                <h1 className="text-center mt-3">Sign In</h1>
                <div>
            <InputText placeholder="email" id="email" onChange={handleEmailChanged.bind(this)}
                       type="email"/>

            <InputText placeholder="****" id="password" onChange={handlePasswordChanged.bind(this)}
                       type="password"/>

            <Button label="Sign In" onClick={onSubmit.bind(this)}/>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignIn;