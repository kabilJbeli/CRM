import axios from "axios";
export const GetCompaniesList = () => async dispatch =>{
try{
    dispatch({
        type:'COMPANIES_LIST_LOADING'
    })
  const res= axios.get('http://localhost:1337/company').then((res)=>{
      console.log(res.data)
      dispatch(...[{
          type: 'COMPANIES_LIST_LOADED_SUCCESSFULLY',
          payload: res['data']}

  ]);
});
    dispatch({
        type: 'COMPANIES_LIST_LOADED_SUCCESSFULLY',
        payload: res.data});

}catch (e){
    dispatch({
        type:'COMPANIES_LIST_FAILED_WHILE_LOADING'
    })
}
}

export const AddNewCompany = (company) => async dispatch =>{
    try{
        dispatch({
            type:'INVOKING_COMPANY_ADD_SERVICE'
        })
       const res= axios.post('http://localhost:1337/company',company).then(res=>res);
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