import * as TYPES from './authTypes';
import axios from "axios";

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

export const authenticateUser = (email, password) => {
    const credentials = {
        email: email,
        password: password
    };

    return dispatch => {
        dispatch(loginRequest());
        axios.post("http://localhost:8080/user/authenticate", credentials)
            .then(res => {
                localStorage.setItem('jwt', res.data.token);
                axios.defaults.headers.common['Authorization'] = res.data.token;
                dispatch(success(true));
            })
            .catch(err => {
                dispatch(failure(false));
            })
    }
};

export const logoutUser = () => (
    dispatch => {
        dispatch(logoutRequest());
        localStorage.removeItem('jwt');
        delete axios.defaults.headers.common['Authorization'];
        dispatch(success(false));
    }
);