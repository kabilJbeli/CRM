import {useAuth} from "./auth";
import {Redirect, Route} from "react-router-dom";
import React from "react";

const PrivateRoute =({ component, ...rest }) => {
    const auth = useAuth()
    return (
        <Route {...rest} render={({ location }) =>
            auth.isAuthenticated ? (component) :
                (<Redirect to={{ pathname: '/sign-in', state: { from: location } }} />)
        }
        />
    )
}
export default PrivateRoute;