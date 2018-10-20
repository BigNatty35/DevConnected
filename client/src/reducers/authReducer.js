import {SET_CURRENT_USER} from '../actions/types';
import isEmpty from '../validations/is-empty'


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
    case SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    }
    default:
      return state;
  }
}