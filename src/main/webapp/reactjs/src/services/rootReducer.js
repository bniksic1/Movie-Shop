import { combineReducers } from "redux";
import userReducer from './user/userReducer';
import movieReducer from './movie/movieReducer';

const rootReducer = combineReducers({
   user: userReducer,
   movie: movieReducer
});

export default rootReducer;