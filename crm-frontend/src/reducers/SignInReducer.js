const defaultState = {
    loading: false,
    data: [],
    signin:false,
    errorMsg:''
}
const SignInReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SIGN_IN_LOADING':
            return {
                ...state,
                loading: true,
                signin:false,
                errorMsg: ''
            }
        case ' SIGN_IN_SUCCESSFULLY':
            return {
                ...state,
                loading: false,
                data:action.payload,
                signin:true,
                errorMsg: ''
            }
        case ' SIGN_IN_FAILED_WHILE_LOADING':
            return {
                ...state,
                loading: false,
                signin:false,
                errorMsg: 'Unable To Sign In'
            }
        default: {
            return state;
        }
    }
}
export default SignInReducer;