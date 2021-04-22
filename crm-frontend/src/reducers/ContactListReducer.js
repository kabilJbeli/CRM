const defaultState = {
    loading: false,
    data: [],
    errorMsg:''
}
const ContactListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CONTACT_LIST_LOADING':
            return {
                ...state,
                loading: true,
                errorMsg: ''
            }
        case 'CONTACT_LIST_LOADED_SUCCESSFULLY':
            return {
                ...state,
                loading: false,
                data:action.payload,
                errorMsg: ''
            }
        case 'CONTACT_LIST_FAILED_WHILE_LOADING':
            return {
                ...state,
                loading: false,
                errorMsg: 'Unable to get Contacts List'
            }
        default: {
            return state;
        }
    }
}
export default ContactListReducer;