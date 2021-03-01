import * as TYPES from './movieTypes';
import axios from "axios";

const saveMovieSuccess = movie => (
    {
        type: TYPES.SAVE_MOVIE_SUCCESS,
        payload: movie
    }
);

const saveMovieFailure = error => (
    {
        type: TYPES.SAVE_MOVIE_FAILURE,
        payload: error
    }
);

export const saveMovie = movie => (
    dispatch => {
        axios.post("http://localhost:8080/api/movies", movie)
            .then(res =>
                dispatch(saveMovieSuccess(res.data))
            )
            .catch(err =>
                dispatch(saveMovieFailure(err))
            );
    }
);