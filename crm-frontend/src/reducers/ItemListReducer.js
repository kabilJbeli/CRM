const defaultState = {
    loading: false,
    data: [],
    errorMsg:''
}
const ItemListReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ITEM_LIST_LOADING':
            return {
                ...state,
                loading: true,
                errorMsg: ''
            }
        case 'ITEM_LIST_LOADED_SUCCESSFULLY':
            return {
                ...state,
                loading: false,
                data:action.payload,
                errorMsg: ''
            }
        case 'ITEM_LIST_FAILED_WHILE_LOADING':
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
export default ItemListReducer;