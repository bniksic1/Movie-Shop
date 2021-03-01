import * as TYPES from './movieTypes';

const initialState = {
    movie: null,
    error: ""
};

const reducer = (state = initialState, action) => {
    if(action.type === TYPES.SAVE_MOVIE_SUCCESS)
        return {
            movie: action.payload,
            error: ""
        };
    else if(action.type === TYPES.SAVE_MOVIE_FAILURE)
        return {
            movie: null,
            error: action.payload
        };
    else
        return state;
};

export default reducer;