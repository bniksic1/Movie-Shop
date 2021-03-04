import * as TYPES from './authTypes';

const initialState = {
    isLoggedIn: false
};

const reducer = (state = initialState, action) => {
    if(action.type === TYPES.LOGIN_REQUEST || action.type === TYPES.LOGOUT_REQUEST)
        return {
            ...state
        };
    else if(action.type === TYPES.SUCCESS)
        return {
            isLoggedIn: action.payload
        };
    else if(action.type === TYPES.FAILURE)
        return {
            isLoggedIn: action.payload
        };
    else
        return state;
};

export default reducer;