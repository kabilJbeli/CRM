import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React from "react";
import {useAuth} from "../../hooks/auth";

const SignUp = (props) => {
    const auth = useAuth();
    const credentials={email:null,password:null};
    const onSubmit = () => {
        auth.signin(credentials)
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
        <div className="sign-in">
            <div className="sign-in-header">
                Customer Relationship Management System
            </div>
            <div className="h-100 d-flex align-items-center">
                <div className="sign-in-content">
                    <h1 className="text-center mt-3">Create An Account</h1>

                    <div>
                        <InputText placeholder="email" id="email" onChange={handleEmailChanged.bind(this)}
                                   type="email"/>

                        <InputText placeholder="****" id="password" onChange={handlePasswordChanged.bind(this)}
                                   type="password"/>

                        <Button label="Sign Up" onClick={onSubmit.bind(this)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;