const defaultState = {
    loading: false,
    data: [],
    errorMsg:''
}
const QuoteListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'QUOTES_LIST_LOADING':
            return {
                ...state,
                loading: true,
                errorMsg: ''
            }
        case 'QUOTES_LIST_LOADED_SUCCESSFULLY':
            return {
                ...state,
                loading: false,
                data:action.payload,
                errorMsg: ''
            }
        case 'QUOTES_LIST_FAILED_WHILE_LOADING':
            return {
                ...state,
                loading: false,
                errorMsg: 'Unable to get Quotes List'
            }
        default: {
            return state;
        }
    }
}
export default QuoteListReducer;