import axios from "axios";
import React from 'react';
import http from 'http';
export const GetItemsList = () => async dispatch =>{
    try{
        dispatch({
            type:'ITEM_LIST_LOADING'
        })
        const res= axios.get('http://localhost:1337/item').then((res)=>{
            console.log(res.data)
            dispatch(...[{
                type: 'ITEM_LIST_LOADED_SUCCESSFULLY',
                payload: res['data']}

            ]);
        });
        dispatch({
            type: 'ITEM_LIST_LOADED_SUCCESSFULLY',
            payload: res.data});

    }catch (e){
        dispatch({
            type:'ITEM_LIST_FAILED_WHILE_LOADING'
        })
    }
}

export const AddNewItem = (item) => async dispatch =>{
    try{
        dispatch({
            type:'INVOKING_COMPANY_ADD_SERVICE'
        })
        const res= axios.post('http://localhost:1337/item',item).then(res=>{
            console.log('res=',res);
            return res;});
        dispatch({
            type:'COMPANIES_ADDED_SUCCESSFULLY',
            payload:res.data}
        );
    }catch (e){
        dispatch({
            type:'FAILED_WHILE_INVOKING_COMPANY_ADD_SERVICE'
        })
    }
}