import {TEST_DISPATCH} from '../actions/types';

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
    case TEST_DISPATCH:
    return {
      ...state,
      user: action.payload
    };
    default:
      return state;
  }
}