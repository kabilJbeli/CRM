const defaultState = {
    loading: false,
    data: [],
    success:false,
    error:false,
    errorMsg:''
}
const AddCompanyReducer = (state = defaultState, action) => {
    console.log('payload',action.payload);
    switch (action.type) {
        case 'INVOKING_COMPANY_ADD_SERVICE':
            return {
                ...state,
                loading: true,
                success: false,
                error:false,
                errorMsg: ''
            }
        case 'COMPANIES_ADDED_SUCCESSFULLY':
            return {
                ...state,
                loading: false,
                data:action.payload,
                success: true,
                error:false,
                errorMsg: ''
            }
        case 'COMPANIES_LIST_FAILED_WHILE_LOADING':
            return {
                ...state,
                loading: false,
                success: false,
                error:true,
                errorMsg: 'Unable to get Companies List'
            }
        default: {
            return state;
        }
    }
}
export default AddCompanyReducer;