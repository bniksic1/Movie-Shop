import * as TYPES from './authTypes';

const loginRequest = () => ({
    type: TYPES.LOGIN_REQUEST
});

const logoutRequest = () => ({
    type: TYPES.LOGOUT_REQUEST
});

const success = isLoggedIn => ({
    type: TYPES.SUCCESS,
    payload: isLoggedIn
});

const failure = isLoggedIn => ({
    type: TYPES.FAILURE,
    payload: isLoggedIn
});

export const authenticateUser = (email, password) => (
    dispatch => {
        dispatch(loginRequest());
        if(email === 'test' && password === 'test')
            dispatch(success(true));
        else
            dispatch(failure(false));
    }
);

export const logoutUser = () => (
    dispatch => {
        dispatch(logoutRequest());
        dispatch(success(false));
    }
);