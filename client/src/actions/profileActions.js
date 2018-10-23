import axios from 'axios';
import {GET_PROFILE, GET_ERRORS, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_CURRENT_USER} from './types';

// Get current users GET_PROFILE

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then(res => 
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err => 
    dispatch({
      type: GET_PROFILE,
      payload: {}
    })
  );
};

// Delete User and Profile
export const deleteProfile = () => dispatch => {
  if(window.confirm("Are you sure you want to delete your profile? This can't be undone!")) {
    axios
    .delete('/api/profile')
    .then(res => dispatch({
      type: SET_CURRENT_USER,
      payload: {}
      })
    )
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
      })
    );
  }
};
// Profile Loading . . .   
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear the current user
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Create profile 

export const createProfile = (profileData, history) => dispatch => {
  axios
  .post('/api/profile', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err =>
     dispatch({
      type: GET_ERRORS,
      payload: err.response.data
   })
  );
};


export const addExperience = (expData, history) =>  dispatch => {
  axios
  .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};
export const addEducation = (expData, history) =>  dispatch => {
  axios
  .post('/api/profile/education', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};