import axios from "axios";
import React from 'react';
import http from 'http';
export const SignInAction = (credentials) => async dispatch =>{
    try{
        dispatch({
            type:'SIGN_IN_LOADING'
        })
        const res= axios.get(`http://localhost:1337/user?email=${credentials.email}&password=${credentials.password}`).then((res)=>{
            console.log(res.data)
            dispatch(...[{
                type: 'SIGN_IN_SUCCESSFULLY',
                payload: res['data']}
            ]);
        });
    }catch (e){
        dispatch({
            type:'SIGN_IN_FAILED_WHILE_LOADING'
        })
    }
}
