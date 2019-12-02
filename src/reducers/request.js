export default function requestReducer(state = {}, action) {
    switch (action.type) {
        case 'REQUEST_SUCCESS':
            return state = {
                ...state,
                start: false,
                success: true,
                text: action.payload,
            }
        case 'REQUEST_FAIL':
            return state = {
                ...state,
                start: false,
                fail: true,
            }
        case 'REQUEST_STARTED':
            return state = {
                start: true,
                success: false,
                fail: false,
                text: '',
            }
        default:
            return state;
    }

};
