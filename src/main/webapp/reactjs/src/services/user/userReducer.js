import * as TYPES from './userTypes';

const initialState = {
    users: [],
    error: ""
};

const reducer = (state = initialState, action) => {
    if(action.type === TYPES.FETCH_USER_REQUEST)
        return {
            ...state
        };
    else if(action.type === TYPES.FETCH_USER_SUCCESS)
        return {
            users: action.payload,
            error: ""
        };
    else if(action.type === TYPES.FETCH_USER_FAILURE)
        return {
            users: [],
            error: action.payload
        };
    else
        return state;
};

export default reducer;