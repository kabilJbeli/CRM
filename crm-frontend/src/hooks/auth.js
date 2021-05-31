import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from "axios";
import {useDispatch} from "react-redux";
import {SignInAction} from "../actions/SignInAction";
import {useHistory} from "react-router-dom";
import Dashboard from "../containers/dashboard/Dashboard";
const authContext = createContext()
export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}> { children } </authContext.Provider>
}
export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const dispatch = useDispatch();
    const history = useHistory();

    let [user, setUser] = useState(null);
    let  authenticated = false;

    const signin = (credentials) => {
        if(credentials) {
            axios.get(`http://localhost:1337/user?email=${credentials.email}&password=${credentials.password}`).then((res) => {
                user =res.data[0];
                if (res.data[0]) {
                    window.location='/dashboard';
                } else {
                    history.push('/');
                }
            });
        }
    }


  const  login=(cb) => {
        this.authenticated = true;
        cb();
    }

    const  logout =(cb) =>  {
        this.authenticated = false;
        cb();
    }

    const isAuthenticated =() => {
        return this.authenticated;
    }

    React.useEffect(() => {
    }, []);

    return {
        user,
        signin
    }
}