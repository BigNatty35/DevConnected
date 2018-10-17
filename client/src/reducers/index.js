import {combineReducers} from 'redux';
import authReducer from './authReducer';


//This is the rootReducer. It just combines all of the reducers into one big object.
export default combineReducers({
  auth: authReducer
});