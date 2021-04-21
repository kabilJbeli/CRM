import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetCompaniesList} from "../../actions/CompanyActions";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
const dispatch = useDispatch();
const companiesList = useSelector(state =>  state.CompanyList);
React.useEffect(()=>{
fetchData()
    setCompanies(companiesList)
},[]);
const fetchData=()=>{
    dispatch(GetCompaniesList());
    }
const showData =()=>{
    if(!_.isEmpty(companiesList.data)){
        return (<div>
                <DataTable value={companiesList.data}>
                    <Column field="id" header="ID"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="country" header="Country"></Column>
                    <Column field="adress" header="Adress"></Column>
                </DataTable>
          </div>)
    }

    if(companiesList.loading){
        return <p>Still Loading</p>
    }
    if(companiesList.errorMsg !=='')
    {
    return <p>{companiesList.errorMsg}</p>
    }
    return <p>Unable to get Data</p>
}
    return (
        <div>
            {showData()}
        </div>
    )
}
export default CompanyList;