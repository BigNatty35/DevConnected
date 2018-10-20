import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducers';
import profileReducer from './profileReducer';
//This is the rootReducer. It just combines all of the reducers into one big object.
export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer
});