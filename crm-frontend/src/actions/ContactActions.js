import axios from "axios";
import React from 'react';
import http from 'http';
export const GetContactsList = () => async dispatch =>{
    try{
        dispatch({
            type:'CONTACT_LIST_LOADING'
        })
        const res= axios.get('http://localhost:1337/contact').then((res)=>{
            dispatch(...[{
                type: 'CONTACT_LIST_LOADED_SUCCESSFULLY',
                payload: res['data']}

            ]);
        });
        dispatch({
            type: 'CONTACT_LIST_LOADED_SUCCESSFULLY',
            payload: res.data});

    }catch (e){
        dispatch({
            type:'CONTACT_LIST_FAILED_WHILE_LOADING'
        })
    }
}

export const AddNewContact = (contact) => async dispatch =>{
    try{
        dispatch({
            type:'INVOKING_CONTACT_ADD_SERVICE'
        })
        const res= axios.post('http://localhost:1337/contact',contact).then(res=>{
            console.log('res=',res);
            return res;});
        dispatch({
            type:'CONTACT_ADDED_SUCCESSFULLY',
            payload:res.data}
        );
    }catch (e){
        dispatch({
            type:'FAILED_WHILE_INVOKING_CONTACT_ADD_SERVICE'
        })
    }
}