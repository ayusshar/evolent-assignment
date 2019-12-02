export default function contactsReducer(state = [], action) {
    let newState = state.slice();
    switch (action.type) {
        case 'ADD_CONTACT':
            return [
                ...state, action.payload
            ];
        case 'EDIT_CONTACT':         
            return newState.map(obj =>
                obj.id === action.payload.id ? { ...obj, ...action.payload } : obj
            );
        case 'DELETE_CONTACT':
            newState.splice(action.index, 1);
            return newState;
        case 'SORT_CONTACTS':
        case 'FETCH_CONTACTS':
            return action.contacts;        
        default:
            return state;
    }

};
