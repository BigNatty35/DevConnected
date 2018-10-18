import {GET_ERRORS} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

/*
*This authReducers takes in an action object and decided how to update the state based on the type.
*  It make s 
*/
export default function(state = initialState, action) {
  switch(action.type) {
    
    default:
      return state;
  }
}