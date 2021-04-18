const defaultState = {
    loading: false,
    data: [],
    errorMsg:''
}
const CompanyListReducer = (state = defaultState, action) => {
    console.log('payload',action.payload);
    switch (action.type) {
        case 'COMPANIES_LIST_LOADING':
            return {
                ...state,
                loading: true,
                errorMsg: ''
            }
        case 'COMPANIES_LIST_LOADED_SUCCESSFULLY':
            return {
                ...state,
                loading: false,
                data:action.payload,
                errorMsg: ''
            }
        case 'COMPANIES_LIST_FAILED_WHILE_LOADING':
            return {
                ...state,
                loading: false,
                errorMsg: 'Unable to get Companies List'
            }
        default: {
            return state;
        }
    }
}
export default CompanyListReducer;