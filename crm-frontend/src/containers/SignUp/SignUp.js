import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useState} from "react";
import {useAuth} from "../../hooks/auth";
import {useDispatch} from "react-redux";
import {Link, useHistory} from "react-router-dom";

const SignUp = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user={firstName:null,lastName:null,email:null,password:null};

    const [state, setState] = useState({user:user});
    const InvokeSetState = (user) => {
        setState(user)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(state.user)
        };
        dispatch({
            type: 'INVOKING_COMPANY_ADD_SERVICE'
        })
        let user = state.user;

        fetch('http://localhost:1337/user', requestOptions)
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                dispatch({
                        type: 'ITEMS_ADDED_SUCCESSFULLY',
                        payload: response.data
                    }
                );
           user.firstName=null;
           user.lastName=null;
           user.password=null;
                user.email=null;
                InvokeSetState(user);

                history.push('/sign-in');

            })
            .catch(error => {
                InvokeSetState({quote : {errorMessage: error.toString()}});
                console.error('There was an error!', error);
                dispatch({
                    type: 'FAILED_WHILE_INVOKING_ITEM_ADD_SERVICE'
                })
            });

    }
    const handleEmailChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name

        let userState= state.user;
        // Update the customer object's first name
        userState.email = modifiedValue;
        InvokeSetState({user:userState});
        // Update the state object

    }

    const handlePasswordChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        let userState= state.user;
        // Update the customer object's first name
        userState.password = modifiedValue;
        InvokeSetState({user:userState});
        // Update the state object

    }

    const handleNameChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;

        // Update the customer object's first name
        let userState= state.user;
        // Update the customer object's first name
        userState.firstName = modifiedValue;
        InvokeSetState({user:userState});
        // Update the state object

    }
    const handleLastNameChanged = (event) => {
        // Extract the current value of the customer from state

        // Extract the value of the input element represented by `target`
        const modifiedValue = event.target.value;
let userState= state.user;
        // Update the customer object's first name
        userState.lastName = modifiedValue;
        InvokeSetState({user:userState});

        // Update the state object

    }
    return (
        <div className="sign-in">
            <div className="sign-in-header">
                Customer Relationship Management System
            </div>
            <div className="sign-in-section">
                <div className="description-section">
                    <h1>Customer Relationship Management</h1>

                </div>
                <div className="h-100 d-flex align-items-center sign-form-wrapper">
                    <div className="sign-up-content">
                        <h1 className="text-center mt-3">Sign Up</h1>
                        <div>
                        <InputText placeholder="First Name" id="name" onChange={handleNameChanged.bind(this)}
                                   type="text"/>
                        <InputText placeholder="Last Name" id="last" onChange={handleLastNameChanged.bind(this)}
                                   type="text"/>
                        <InputText placeholder="Email" id="email" onChange={handleEmailChanged.bind(this)}
                                   type="email"/>
                        <InputText placeholder="****" id="password" onChange={handlePasswordChanged.bind(this)}
                                   type="password"/>

                        <Button label="Sign Up" onClick={onSubmit.bind(this)}/>
                            <Link to="/sign-in" className="text-center text-white">
                                Already Have An Account: Sign In
                                </Link>
                    </div>
                </div>
            </div>   </div>

        </div>
    )
}

export default SignUp;