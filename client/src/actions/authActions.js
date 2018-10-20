import { GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from "axios";
import setAuthToken from '../../src/utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { clearCurrentProfile } from './profileActions';


// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Login User

export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      //Save to localStorage
      const {token} = res.data;
      // set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth Header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};


export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};


export const logoutUser = () => dispatch =>  {
  //delete token from localstore
  localStorage.removeItem('jwtToken');
  // remove auth header for future requests
  setAuthToken(false);
  // Set current User to {} which will make isAuthenticated false;
  dispatch(setCurrentUser({}));
};