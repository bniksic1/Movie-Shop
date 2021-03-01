import * as TYPES from './userTypes';
import axios from 'axios';

// const fetchUserRequest = () => (
//     {
//         type: TYPES.FETCH_USER_REQUEST
//     }
// );
//

const fetchUserSuccess = users => (
    {
        type: TYPES.FETCH_USER_SUCCESS,
        payload: users
    }
);

const fetchUserFailure = error => (
    {
        type: TYPES.FETCH_USER_FAILURE,
        payload: error
    }
);

export const fetchUsers = () => (
    dispatch => {
        // dispatch(fetchUserRequest());
        axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
            .then(res =>
                dispatch(fetchUserSuccess(res.data))
            )
            .catch(err =>
                dispatch(fetchUserFailure(err.message))
            )
    }
);