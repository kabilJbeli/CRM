import React from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetCompaniesList} from "../../actions/CompanyActions";

const CompanyList = () => {
const dispatch = useDispatch();
const companiesList = useSelector(state =>  state.CompanyList);
React.useEffect(()=>{
fetchData()
},[]);
const fetchData=()=>{
    dispatch(GetCompaniesList());
    }
const showData =()=>{
    if(!_.isEmpty(companiesList.data)){
        return (<p>
            {companiesList.data.map(company => <p>Company Name: {company.name}</p>)}
          </p>)
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