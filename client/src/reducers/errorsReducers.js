import { GET_ERRORS } from '../actions/types';

const initialState = {};

/*
*This authReducers takes in an action object and decided how to update the state based on the type.
*  It make s 
*/
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
    return action.payload;
    default:
      return state;
  }
}