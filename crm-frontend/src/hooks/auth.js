import React, { useState, useEffect, useContext, createContext } from 'react'
import axios from "axios";
const authContext = createContext()
export function ProvideAuth({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}> { children } </authContext.Provider>
}
export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const signin = (credentials) => {
        axios.get(`http://localhost:1337/user?email=${credentials.email}&password=${credentials.password}`).then((res)=>{
            setUser(res.data[0]);
        });

    }
    useEffect(() => {
        //check authentication
    }, [])
    return {
        user,
        signin
    }
}